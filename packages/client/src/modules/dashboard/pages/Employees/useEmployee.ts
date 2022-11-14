import { useMutation, useQuery } from "@apollo/client";
import produce from "immer";
import {
  DisableEmployeeDocument,
  EnableEmployeeDocument,
  GetEmployeesDocument,
} from "../../../../graphQL/generated/graphql";
import { usePagination } from "../../../../hooks/usePagination";

export const useEmployee = (
  search: string | undefined,
  status: number | undefined,
  employee_id: string | undefined
) => {
  const pagination = usePagination();
  const getEmployeeQuery = useQuery(GetEmployeesDocument, {
    variables: {
      limit: pagination.itemsPerPage,
      offset: pagination.pageOffset,
      search,
      filter: {
        status,
      },
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
    update(cache) {
      const query = GetEmployeesDocument;
      // Read current object
      const queryData = cache.readQuery({
        query,
        variables: {
          limit: pagination.itemsPerPage,
          offset: pagination.pageOffset,
          search,
          filter: {
            status,
          },
        },
      });
      if (
        queryData &&
        queryData.getEmployees &&
        queryData.getEmployees.length !== 0
      ) {
        // Create new object
        const nextState = produce(queryData.getEmployees, (draftState) => {
          const index = queryData.getEmployees?.findIndex(
            (props) => props?.employee_id === employee_id
          );
          if (draftState && typeof index !== "undefined") {
            const obj = draftState[index];
            if (obj) obj.status = 1;
          }
        });
        // Write object
        cache.writeQuery({
          query,
          data: {
            getEmployees: [...nextState],
          },
          variables: {
            limit: pagination.itemsPerPage,
            offset: pagination.pageOffset,
            search,
            filter: {
              status,
            },
          },
        });
      }
    },
  });

  const disableAccountMutation = useMutation(DisableEmployeeDocument, {
    update(cache) {
      const query = GetEmployeesDocument;
      // Read current object
      const queryData = cache.readQuery({
        query,
        variables: {
          limit: pagination.itemsPerPage,
          offset: pagination.pageOffset,
          search,
          filter: {
            status,
          },
        },
      });
      if (
        queryData &&
        queryData.getEmployees &&
        queryData.getEmployees.length !== 0
      ) {
        // Create new object
        const nextState = produce(queryData.getEmployees, (draftState) => {
          const index = queryData.getEmployees?.findIndex(
            (props) => props?.employee_id === employee_id
          );
          if (draftState && typeof index !== "undefined") {
            const obj = draftState[index];
            if (obj) obj.status = 0;
          }
        });
        // Write object
        cache.writeQuery({
          query,
          data: {
            getEmployees: [...nextState],
          },
          variables: {
            limit: pagination.itemsPerPage,
            offset: pagination.pageOffset,
            search,
            filter: {
              status,
            },
          },
        });
      }
    },
  });

  return {
    handleRefetch,
    pagination,
    getEmployeeQuery,
    enableAccountMutation,
    disableAccountMutation,
  };
};
