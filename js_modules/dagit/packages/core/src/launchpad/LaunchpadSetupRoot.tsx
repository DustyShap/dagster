import qs from 'qs';
import * as React from 'react';
import {Redirect} from 'react-router-dom';

import {IExecutionSession, applyCreateSession, useStorage} from '../app/LocalStorage';
import {explorerPathFromString} from '../pipelines/PipelinePathUtils';
import {useJobTitle} from '../pipelines/useJobTitle';
import {isThisThingAJob, useRepository} from '../workspace/WorkspaceContext';
import {RepoAddress} from '../workspace/types';
import {workspacePathFromAddress} from '../workspace/workspacePath';

interface Props {
  pipelinePath: string;
  repoAddress: RepoAddress;
}

export const LaunchpadSetupRoot: React.FC<Props> = (props) => {
  const {pipelinePath, repoAddress} = props;

  const explorerPath = explorerPathFromString(pipelinePath);
  const {pipelineName} = explorerPath;

  const repo = useRepository(repoAddress);
  const isJob = isThisThingAJob(repo, pipelineName);

  useJobTitle(explorerPath, isJob);

  const [data, onSave] = useStorage(repoAddress.name, pipelineName);
  const queryString = qs.parse(window.location.search, {ignoreQueryPrefix: true});

  React.useEffect(() => {
    if (queryString.config || queryString.mode || queryString.solidSelection) {
      const newSession: Partial<IExecutionSession> = {};
      if (typeof queryString.config === 'string') {
        newSession.runConfigYaml = queryString.config;
      }
      if (typeof queryString.mode === 'string') {
        newSession.mode = queryString.mode;
      }
      if (queryString.solidSelection instanceof Array) {
        newSession.solidSelection = queryString.solidSelection as string[];
      } else if (typeof queryString.solidSelection === 'string') {
        newSession.solidSelection = [queryString.solidSelection];
      }
      if (typeof queryString.solidSelectionQuery === 'string') {
        newSession.solidSelectionQuery = queryString.solidSelectionQuery;
      }

      onSave(applyCreateSession(data, newSession));
    }
  });

  return (
    <Redirect
      to={{
        pathname: workspacePathFromAddress(
          repoAddress,
          `/${isJob ? 'jobs' : 'pipelines'}/${pipelineName}/playground`,
        ),
      }}
    />
  );
};