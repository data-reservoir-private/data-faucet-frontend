import { RefreshCwIcon } from "lucide-react";
import { v4 as uuid4, v7 as uuid7 } from "uuid";
import TextCopyButton from "#/components/common/TextCopyButton";
import { Button } from "#/components/ui/button";
import { Textarea } from "#/components/ui/textarea";
import { useAppForm } from "#/integrations/tanstack-form/form-hook";

export default function UUIDComponent({ type }: { type: "v7" | "v4" }) {
  const generateUUID = () => (type === "v7" ? uuid7() : uuid4());

  const form = useAppForm({
    defaultValues: {
      single: generateUUID(),
      multipleValue: 2,
      multiple: Array.from({ length: 2 }, () => generateUUID()),
    },
  });

  const handleGenerateMultiple = () => {
    const count = form.getFieldValue("multipleValue");
    const newUuids = Array.from({ length: count }, () => generateUUID());
    form.setFieldValue("multiple", newUuids);
  };

  return (
    <form.AppForm>
      <form.FormContainer>
        {/* Single Field */}
        <div className="flex flex-col gap-2">
          <span>Single Value</span>
          <div className="flex gap-2">
            <form.AppField name="single">
              {(field) => (
                <field.FormTextField
                  size="2xl"
                  readOnly
                  className="font-[consolas]"
                />
              )}
            </form.AppField>
            <Button
              type="button"
              size="2xl"
              onClick={() => form.setFieldValue("single", generateUUID())}
            >
              <RefreshCwIcon />
            </Button>
            <form.Subscribe selector={(x) => x.values.single}>
              {(value) => <TextCopyButton content={value} size="2xl" />}
            </form.Subscribe>
          </div>
        </div>

        <br />

        {/* Multiple Fields */}
        <div className="flex flex-col gap-2">
          <span>Multiple Values</span>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <form.AppField name="multipleValue">
                {(field) => (
                  <field.FormNumberField
                    min={1}
                    max={1000}
                    step={1}
                    onClickEnter={() => handleGenerateMultiple()}
                    label="Number of Guids"
                  />
                )}
              </form.AppField>
              <Button type="button" onClick={handleGenerateMultiple}>
                <RefreshCwIcon />
              </Button>
              <form.Subscribe selector={(x) => x.values.multiple}>
                {(value) => <TextCopyButton content={value.join("\n")} />}
              </form.Subscribe>
            </div>
            <form.AppField name="multiple">
              {(field) => (
                <Textarea
                  value={field.state.value.join("\n")}
                  readOnly
                  className="font-[consolas]"
                />
              )}
            </form.AppField>
          </div>
        </div>
      </form.FormContainer>
    </form.AppForm>
  );
}
