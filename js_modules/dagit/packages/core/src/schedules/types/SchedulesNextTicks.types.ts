// Generated GraphQL types, do not edit manually.

import * as Types from '../../graphql/types';

export type ScheduleNextFiveTicksFragment = {
  __typename: 'Schedule';
  id: string;
  name: string;
  executionTimezone: string | null;
  mode: string;
  solidSelection: Array<string | null> | null;
  pipelineName: string;
  scheduleState: {__typename: 'InstigationState'; id: string; status: Types.InstigationStatus};
  futureTicks: {
    __typename: 'FutureInstigationTicks';
    results: Array<{__typename: 'FutureInstigationTick'; timestamp: number}>;
  };
};

export type RepositoryForNextTicksFragment = {
  __typename: 'Repository';
  name: string;
  id: string;
  location: {__typename: 'RepositoryLocation'; id: string; name: string};
  schedules: Array<{
    __typename: 'Schedule';
    id: string;
    name: string;
    executionTimezone: string | null;
    mode: string;
    solidSelection: Array<string | null> | null;
    pipelineName: string;
    scheduleState: {__typename: 'InstigationState'; id: string; status: Types.InstigationStatus};
    futureTicks: {
      __typename: 'FutureInstigationTicks';
      results: Array<{__typename: 'FutureInstigationTick'; timestamp: number}>;
    };
  }>;
};

export type ScheduleTickConfigQueryVariables = Types.Exact<{
  scheduleSelector: Types.ScheduleSelector;
  tickTimestamp: Types.Scalars['Int'];
}>;

export type ScheduleTickConfigQuery = {
  __typename: 'DagitQuery';
  scheduleOrError:
    | {__typename: 'PythonError'}
    | {
        __typename: 'Schedule';
        id: string;
        futureTick: {
          __typename: 'FutureInstigationTick';
          evaluationResult: {
            __typename: 'TickEvaluation';
            skipReason: string | null;
            runRequests: Array<{
              __typename: 'RunRequest';
              runKey: string | null;
              runConfigYaml: string;
              tags: Array<{__typename: 'PipelineTag'; key: string; value: string}>;
            } | null> | null;
            error: {
              __typename: 'PythonError';
              message: string;
              stack: Array<string>;
              errorChain: Array<{
                __typename: 'ErrorChainLink';
                isExplicitLink: boolean;
                error: {__typename: 'PythonError'; message: string; stack: Array<string>};
              }>;
            } | null;
          } | null;
        };
      }
    | {__typename: 'ScheduleNotFoundError'};
};

export type ScheduleFutureTickEvaluationResultFragment = {
  __typename: 'TickEvaluation';
  skipReason: string | null;
  runRequests: Array<{
    __typename: 'RunRequest';
    runKey: string | null;
    runConfigYaml: string;
    tags: Array<{__typename: 'PipelineTag'; key: string; value: string}>;
  } | null> | null;
  error: {
    __typename: 'PythonError';
    message: string;
    stack: Array<string>;
    errorChain: Array<{
      __typename: 'ErrorChainLink';
      isExplicitLink: boolean;
      error: {__typename: 'PythonError'; message: string; stack: Array<string>};
    }>;
  } | null;
};

export type ScheduleFutureTickRunRequestFragment = {
  __typename: 'RunRequest';
  runKey: string | null;
  runConfigYaml: string;
  tags: Array<{__typename: 'PipelineTag'; key: string; value: string}>;
};
