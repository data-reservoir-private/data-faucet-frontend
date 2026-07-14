import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { RefreshCwIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useState } from "react";
import { getJobsHistory, type JobHistoryResponse } from "#/api/jobs";
import BaseTable, { makeColumn, makeIndexColumn } from "#/components/common/BaseTable";
import { Button } from "#/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { cn } from "#/lib/utils";

type JobHistory = Omit<JobHistoryResponse, "date"> & { date: DateTime };
type JobHistoryState = {
  currentPage: number;
  pageSize: number;
}

export default function JobHistory() {
  const getJobHistoryService = useServerFn(getJobsHistory);
  const [state, setState] = useState<JobHistoryState>({
    currentPage: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["job-history", state],
    queryFn: async () => {
      const data = await getJobHistoryService({ data: state });
      return {
        ...data,
        data: data.data.map((item) => ({
          ...item,
          date: DateTime.fromISO(item.date),
        })),
      }
    },
  });

  const columns = makeColumn<JobHistory>(helper => [
    makeIndexColumn(helper),
    helper.accessor('date', {
      cell: info => info.getValue().toFormat('cccc, yyyy-LL-dd HH:mm:ss'),
      header: 'Date',
    }),
    helper.accessor('category', {
      cell: info => info.getValue(),
      header: 'Category',
    }),
    helper.accessor('name', {
      cell: info => info.getValue(),
      header: 'Name',
    }),
    helper.accessor('success', {
      cell: info => (
        <span className={cn('rounded-full font-bold', {
          'bg-green-700 text-green-200 px-2 py-1': info.getValue(),
          'bg-red-700 text-red-200 px-2 py-1': !info.getValue(),
        })}>
          {info.getValue() ? 'Success' : 'Failed'}
        </span>
      ),
      header: 'Status',
    }),
    helper.accessor('message', {
      cell: info => <span className='font-[consolas]'>{info.getValue() ?? '-'}</span>,
      header: 'Message',
    }),
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job History</CardTitle>
        <CardAction>
          <Button disabled={isLoading} onClick={() => refetch()}>
            <RefreshCwIcon/>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <BaseTable
          columns={columns}
          data={data?.data ?? []}
          isLoading={isLoading}
          pagination={{ 
            serverSide: true,
            totalData: data?.totalData ?? 0,
            pageSize: state.pageSize,
            currentPage: state.currentPage,
            onChangePageNumber: (pageNumber) => setState(prev => ({ ...prev, currentPage: pageNumber })),
            onChangePageSize: (pageSize) => setState(prev => ({ ...prev, pageSize, currentPage: 0 })),
          }}
        />
      </CardContent>
    </Card>
  );
}