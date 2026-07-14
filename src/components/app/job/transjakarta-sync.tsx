import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { triggerTransjakartaSync } from "#/api/jobs";
import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "#/components/ui/card";

type TransjakartaSyncState = {
  success: boolean;
  message: string;
};

export default function TransjakartaSync() {
  const [state, setState] = useState<TransjakartaSyncState | null>(null);
  const triggerTransjakartaFunction = useServerFn(triggerTransjakartaSync);

  const { mutate, isPending } = useMutation({
    mutationFn: async (useExcel: boolean) => {
      await triggerTransjakartaFunction({ data: { useExcel } });
    },
    onSuccess: () => {
      setState({
        success: true,
        message: "Transjakarta sync job triggered successfully. Please wait for the results at the dashboard.",
      });
    },
    onError: (error: Error) => {
      setState({
        success: false,
        message: error.message || "An error occurred while triggering the Transjakarta sync job.",
      });
    }
  });

  return (
    <Card className='w-full grow'>
      <CardHeader>
        <CardTitle>Transjakarta Sync</CardTitle>
        <CardDescription>
          Trigger Transjakarta's sync job (sync fetched data from fetch job into database)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state && (
          <Alert
            variant={state.success ? "success" : "destructive"}
            className="mb-4"
          >
            {state.success ? <CheckCircle2Icon /> : <XCircleIcon />}
            <AlertTitle>{state.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription className="text-white!">
              {state.message ?? "Please wait for the results at the dashboard."}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="grow btn btn-primary" onClick={() => mutate(true)} disabled={isPending}>
          Trigger Excel
        </Button>
        <Button className="grow btn btn-primary" onClick={() => mutate(false)} disabled={isPending}>
          Trigger JSON
        </Button>
      </CardFooter>
    </Card>
  );
}
