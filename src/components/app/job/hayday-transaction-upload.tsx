import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import {
  uploadExcelSchema,
  type uploadExcelSchemaType,
  uploadHaydayExcel,
  uploadTransactionExcel,
} from "#/api/jobs";
import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { FileMimeType } from "#/constants/file";
import { useAppForm } from "#/integrations/tanstack-form/form-hook";
import { objectToFormData } from "#/utilities/backend-api";

type HaydayTransactionUploadState = {
  success: boolean;
  message: string;
};

export default function HaydayTransactionUpload({ type } : { type: "hayday" | "transaction" }) {
  const uploadHaydayExcelFunction = useServerFn(uploadHaydayExcel);
  const uploadTransactionExcelFunction = useServerFn(uploadTransactionExcel);
  const [state, setState] = useState<HaydayTransactionUploadState | null>(null);

  const { mutateAsync } = useMutation({
    mutationFn: (data: uploadExcelSchemaType) => {
      if (type === "hayday") {
        return uploadHaydayExcelFunction({
          data: objectToFormData(data),
        });
      } else {
        return uploadTransactionExcelFunction({
          data: objectToFormData(data),
        });
      }
    },
    onSuccess: (data) => {
      setState({
        success: true,
        message: data.message,
      });
    },
    onError: (error: Error) => {
      setState({
        success: false,
        message: error.message || "An error occurred during file upload.",
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      rawData: null as File | null,
    } as uploadExcelSchemaType,
    validators: {
      onSubmit: uploadExcelSchema,
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  return (
    <form.AppForm>
      <form.FormContainer className='w-full grow'>
        <Card>
          <CardHeader>
            <CardTitle>{type === "hayday" ? "Hayday" : "Transaction"}</CardTitle>
            <CardDescription>
              {type === "hayday"
                ? "Upload Hayday excel file to update truck order and master data"
                : "Upload Transaction excel file to update transaction records"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {state && (
              <Alert variant={state.success ? "success" : "destructive"} className='mb-4'>
                {state.success ? <CheckCircle2Icon /> : <XCircleIcon />}
                <AlertTitle>{state.success ? "Success" : "Error"}</AlertTitle>
                <AlertDescription className='text-white!'>{state.message ?? 'Please wait for the results at the dashboard.'}</AlertDescription>
              </Alert>
            )}
            <form.AppField name="rawData">
              {(field) => (
                <field.FormSingleFile
                  acceptedFileTypes={[FileMimeType.EXCEL]}
                />
              )}
            </form.AppField>
          </CardContent>
          <CardFooter>
            <form.FormSubmitButton className="w-full">Submit</form.FormSubmitButton>
          </CardFooter>
        </Card>
      </form.FormContainer>
    </form.AppForm>
  );
}
