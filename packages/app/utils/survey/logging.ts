import { addGenericBreadcrumb } from "~/utils/sentry";
import { Breadcrumb } from "@sentry/types";

type SurveyBreadcrumbInfo = Pick<Breadcrumb, "category" | "data">;

type SurveyBreadcrumbOperation<TResult = void> =
  | (() => TResult)
  | (() => Promise<TResult>);

function toBreadcrumbInfo(info: SurveyBreadcrumbInfo | string) {
  let breadcrumbInfo: SurveyBreadcrumbInfo;
  if (typeof info === "string") {
    breadcrumbInfo = {
      category: info,
    };
  } else {
    breadcrumbInfo = info;
  }

  return breadcrumbInfo;
}

export function logSurveyBreadcrumb(info: SurveyBreadcrumbInfo): void;
export function logSurveyBreadcrumb(category: string): void;
export function logSurveyBreadcrumb(info: SurveyBreadcrumbInfo | string): void {
  addGenericBreadcrumb({
    type: "debug",
    ...toBreadcrumbInfo(info),
  });
}

export async function logSurveyOperation<TOperationResult = void>(
  operation: SurveyBreadcrumbOperation<TOperationResult>,
  info: SurveyBreadcrumbInfo
): Promise<TOperationResult>;
export async function logSurveyOperation<TOperationResult = void>(
  operation: SurveyBreadcrumbOperation<TOperationResult>,
  category: string
): Promise<TOperationResult>;
export async function logSurveyOperation<TOperationResult = void>(
  operation: SurveyBreadcrumbOperation<TOperationResult>,
  info: SurveyBreadcrumbInfo | string
): Promise<TOperationResult> {
  const breadcrumbInfo = toBreadcrumbInfo(info);

  logSurveyBreadcrumb({
    ...breadcrumbInfo,
    category: `${breadcrumbInfo.category} started`,
  });

  const result = await operation();

  logSurveyBreadcrumb({
    ...breadcrumbInfo,
    category: `${breadcrumbInfo.category} finished`,
  });

  return result;
}
