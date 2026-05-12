import React, { ComponentType, useCallback, useEffect, useState } from "react";

import { NonUndefined } from "utility-types";

import { QueryHookOptions, QueryResult } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

import { useController } from "~/contexts";

import useFocusPolling from "~/hooks/useFocusPolling";

import Splash from "./Splash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractQuery<H extends (...args: any) => any> = NonUndefined<
  ReturnType<H>["data"]
>;

export type DataHookProp<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  H extends (...args: any) => any
> = ExtractQuery<H>;

type QueryHook<Q, V> = (
  baseOptions?: QueryHookOptions<Q, V>
) => QueryResult<Q, V>;

export class GoBack extends Error {
  constructor() {
    super("Component was unable to ");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

type GoBackBoundaryProps = {
  navigation?: ReturnType<typeof useNavigation>;
};

type GoBackBoundaryState = {
  hasError: boolean;
};

class GoBackBoundary extends React.Component<GoBackBoundaryProps> {
  public state: GoBackBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): GoBackBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    if (error instanceof GoBack && this.props.navigation) {
      this.props.navigation.goBack();
    } else {
      throw error;
    }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <></>;
    }

    return this.props.children;
  }
}

type Props<Q> = {
  data: Q;
};

export const withQueryData = <Q, V>(
  useQuery: QueryHook<Q, V>,
  {
    options,
    useVariables: loadVariables,
    variables: staticVariables,
    disableGoBack,
    focusPollInterval = 5000,
  }: {
    options?: QueryHookOptions<Q, V>;
    useVariables?: (
      controllerContext: ReturnType<typeof useController>
    ) => V | undefined;
    variables?: V;
    disableGoBack?: boolean;
    focusPollInterval?: number;
  } = {}
) => <P extends Props<Q>>(
  WrappedComponent: ComponentType<P>
): React.FC<Omit<P, "data">> => {
  return (props: Omit<P, "data">) => {
    const controllerContext = useController();
    const navigation = useNavigation();

    const variables =
      staticVariables != null
        ? staticVariables
        : (loadVariables && loadVariables(controllerContext)) ?? undefined;

    const queryResult = useQuery({
      fetchPolicy: "cache-and-network",
      ...options,
      variables,
    });

    const { data, loading, startPolling, stopPolling, refetch } = queryResult;

    const queryFailed = !loading && !data;

    useEffect(() => {
      if (queryFailed) {
        // TODO(nleach): Add Sentry logging

        if (!disableGoBack) {
          navigation.goBack();
        } else {
          // TODO(nleach): What should we actually do here?
          throw new Error();
        }
      }
    }, [navigation, queryFailed]);

    useFocusPolling(refetch, startPolling, stopPolling, focusPollInterval);

    if (!data) {
      return <Splash />;
    }

    // The typecast is kind of a bummer but should be safe
    // https://stackoverflow.com/a/51084259
    return (
      <GoBackBoundary navigation={disableGoBack ? undefined : navigation}>
        <WrappedComponent {...(props as P)} data={data} />
      </GoBackBoundary>
    );
  };
};
