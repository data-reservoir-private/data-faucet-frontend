import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { triggerTransjakartaFetchJSON } from "#/api/jobs";
import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "#/components/ui/card";

type TransjakartaFetchJSONState = {
  success: boolean;
  message: string;
};

export default function TransjakartaFetchJSON() {
  const [state, setState] = useState<TransjakartaFetchJSONState | null>(null);
  const triggerTransjakartaFunction = useServerFn(triggerTransjakartaFetchJSON);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await triggerTransjakartaFunction();
    },
    onSuccess: () => {
      setState({
        success: true,
        message: "Transjakarta fetch job triggered successfully. Please wait for the results at the dashboard.",
      });
    },
    onError: (error: Error) => {
      setState({
        success: false,
        message: error.message || "An error occurred while triggering the Transjakarta fetch job.",
      });
    }
  });

  return (
    <Card className='w-full grow'>
      <CardHeader>
        <CardTitle>Transjakarta Fetch</CardTitle>
        <CardDescription>
          Trigger Transjakarta's daily fetch job (fetching data from website and archive the data into JSON)
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
      <CardFooter>
        <Button className="w-full btn btn-primary" onClick={() => mutate()} disabled={isPending}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
