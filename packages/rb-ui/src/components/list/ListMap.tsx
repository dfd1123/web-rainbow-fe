"use client";

import React, { ReactElement, ReactNode, cloneElement, useMemo } from "react";

import { makeCxFunc } from "@packages/rb-utils/parserUtils";
import { GetArrayItemType, UnknownArrayType } from "types/utility";

import ErrorBoundary from "@/components/error/ErrorBoundary";
import Spinner from "@/components/loadings/Spinner";
import NoData from "@/components/no-data/NoData";

import style from "./ListMap.module.scss";

interface PropsType<LIST extends UnknownArrayType> {
  /**
   * 랜더링할 list 배열
   *
   * list가 null이라면 로딩중이라고 판단
   */
  list: LIST | null;
  /**
   * list가 빈배열일때 데이터가 없다고 보여줄 메시지
   */
  noDataMsg?: string | ReactElement;
  /**
   * 에러 발생시 랜더링할 요소 (ReactNode | ReactElement | string)
   */
  errorFallback?: ReactElement | ReactNode | string;
  /**
   * 리스트가 `null`일 때 로딩 중임을 표시할 요소
   *
   * 문자열 또는 React 컴포넌트 형태로 제공할 수 있으며, 데이터를 로딩 중임을 사용자에게 알리는 데 사용
   */
  loadingElement?: string | ReactElement;
  /**
   * list가 null일때 skeleton 처리를 하고자 하는 Skeleton 컴포넌트
   */
  skeletonElement?: ReactElement;
  /**
   * Skeleton 컴포넌트를 몇 개 노출시킬지 결정하는 속성
   */
  skeletonCnt?: number;
  /**
   * 로딩 상태를 강제로 지정하고 싶을 때 사용되는 프로퍼티
   *
   * `true`로 설정될 경우, `list`의 값과 관계없이 로딩 상태로 간주되며, `loadingElement` 혹은 `skeletonElement`가 화면에 표시
   */
  loading?: boolean;
  /**
   * 자식 컴포넌트를 랜더링하는 함수
   * 이 함수는 리스트의 각 항목을 받아 React 노드로 변환하는 데 사용
   * 함수는 리스트의 각 항목(`item`)과 해당 항목의 인덱스(`index`)를 매개변수로 받음
   */
  children: (obj: { item: GetArrayItemType<LIST>; index: number }) => ReactNode;
}

const cx = makeCxFunc(style);

/**
 * `ListMap` 컴포넌트는 리스트 데이터를 랜더링하거나 로딩 상태를 표시
 *
 * @component
 * @param {LIST|null} props.list - 랜더링할 리스트 데이터입니다. `null`일 경우 로딩 중임을 의미
 * @param {string|ReactElement} [props.noDataMsg] - 데이터가 없을 때 표시될 메시지 또는 컴포넌트
 * @param {string|ReactElement} [props.errorFallback] - 에러 발생시 랜더링할 요소 (ReactNode | ReactElement | string)
 * @param {string|ReactElement} [props.loadingElement] - 로딩 중일 때 표시될 요소
 * @param {ReactElement} [props.skeletonElement] - 로딩 중일 때 표시될 스켈레톤 컴포넌트
 * @param {number} [props.skeletonCnt] - 표시될 스켈레톤 컴포넌트의 개수
 * @param {boolean} [props.loading] - 로딩 상태를 강제로 설정할 때 사용. `true`로 설정 시, 로딩 상태로 간주
 * @param {function} props.children - 리스트 항목을 랜더링하는 함수. 각 항목과 인덱스를 매개변수로 받음.
 *
 * @example
 *
 * <ListMap list={[1, 2, 3]}>
 *    {({item, index}) => (
 *      <div key={index}>{item}</div>
 *    )}
 * </ListMap>
 */
const ListMap = <LIST extends UnknownArrayType>({
  list,
  loadingElement = (
    <div className={cx("loading")}>
      <Spinner size={40} />
    </div>
  ),
  skeletonElement,
  skeletonCnt = 3,
  noDataMsg,
  loading = false,
  errorFallback,
  children,
}: PropsType<LIST>) => {
  /**
   * 랜더링할 내용을 조건에 맞게 반환
   */
  const renderList = useMemo(() => {
    // list가 null이면 로딩중이라고 판단
    // loading이 true이면 로딩중이라고 판단
    if (!list || loading) {
      // skeletonElement가 없다면 loadingElement 반환
      if (!skeletonElement) {
        return loadingElement;
      } else {
        // skeletonElement가 있다면 skeleton list 반환
        return Array.from({ length: skeletonCnt }).map((_, index) => {
          return cloneElement(skeletonElement, {
            ...(skeletonElement as AllowAny).props,
            key: index,
          });
        });
      }

      // list가 빈배열이라면 NoData 반환
    } else if (list.length === 0) {
      return typeof noDataMsg === "object" ? (
        noDataMsg
      ) : (
        <NoData className={cx("no-data")} nullText={noDataMsg} />
      );
    } else {
      /**
       * list 배열이 있다면 함수로 children 쓸 수 있도록 반환
       *
       * @example
       *
       * <ListMap list={[1, 2, 3]}>
       *    {({item, index}) => (
       *      <div key={index}>{item}</div>
       *    )}
       * </ListMap>
       */
      return list.map((item, index) =>
        children({ item: item as GetArrayItemType<LIST>, index }),
      );
    }
  }, [
    list,
    skeletonElement,
    loadingElement,
    skeletonCnt,
    noDataMsg,
    loading,
    children,
  ]);

  return (
    <ErrorBoundary fallback={!errorFallback || loadingElement}>
      {renderList}
    </ErrorBoundary>
  );
};

export type { PropsType as ListMapProps };
export default ListMap;
