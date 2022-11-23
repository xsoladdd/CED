import { useMutation, useQuery } from "@apollo/client";
import {
  DisableEmployeeDocument,
  EnableEmployeeDocument,
  GetEmployeesDocument,
} from "../../../../graphQL/generated/graphql";
import { usePagination } from "../../../../hooks/usePagination";

export const useEmployee = () => {
  const pagination = usePagination();
  const getEmployeeQuery = useQuery(GetEmployeesDocument, {
    variables: {
      limit: pagination.itemsPerPage,
      offset: pagination.pageOffset,
      search: "",
      filter: {},
    },
  });

  const handleRefetch = (param: { search?: string; status?: number }) => {
    pagination.resetPagination();
    if (pagination.page === 1) {
      getEmployeeQuery.refetch({
        limit: pagination.itemsPerPage,
        offset: pagination.pageOffset,
        search: param.search,
        filter: {
          status: param.status,
        },
      });
    }
  };

  const enableAccountMutation = useMutation(EnableEmployeeDocument, {
    refetchQueries: [
      {
        query: GetEmployeesDocument,
        variables: {
          limit: pagination.itemsPerPage,
          offset: pagination.pageOffset,
          search: "",
          filter: {},
        },
      },
    ],
  });

  const disableAccountMutation = useMutation(DisableEmployeeDocument, {
    refetchQueries: [
      {
        query: GetEmployeesDocument,
        variables: {
          limit: pagination.itemsPerPage,
          offset: pagination.pageOffset,
          search: "",
          filter: {},
        },
      },
    ],
  });

  return {
    handleRefetch,
    pagination,
    getEmployeeQuery,
    enableAccountMutation,
    disableAccountMutation,
  };
};
