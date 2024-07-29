"use client";
import { Step, Stepper, useStepper } from "@/components/customs/stepper";
import {
  TypographyH1,
  TypographyH2,
  TypographyH4,
} from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/store/use-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SearchInput from "../../_components/layout/ui/SearchInput";
import { Check, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createSpace } from "@/server/space";
import { useRouter } from "next/navigation";

const steps = [
  { label: "Step 1", description: "Space" },
  { label: "Step 2", description: "Members" },
];

const CreateSpaceForm = () => {
  const [space, setSpace] = useState({});

  const handleUpdateSpace = (data: any) => {
    setSpace((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <TypographyH2>Create New Space</TypographyH2>
      <Stepper variant="line" initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <FirstStepForm onUpdateSpace={handleUpdateSpace} />
              </Step>
            );
          }
          return (
            <Step key={stepProps.label} {...stepProps}>
              <SecondStepForm onUpdateSpace={handleUpdateSpace} />
            </Step>
          );
        })}
        <MyStepperFooter space={space} />
      </Stepper>
    </div>
  );
};

export default CreateSpaceForm;

const FirstFormSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Space name must be at least 2 characters.",
  }),
  purpose: z.string().trim().min(1, "Select space purpose"),
  privacy: z.string().trim().min(1, "Select space privacy"),
});

function FirstStepForm({
  onUpdateSpace,
}: {
  onUpdateSpace: (data: any) => void;
}) {
  const { nextStep } = useStepper();
  const form = useForm<z.infer<typeof FirstFormSchema>>({
    resolver: zodResolver(FirstFormSchema),
    defaultValues: {
      name: "",
      privacy: "public",
      purpose: "collaboration",
    },
  });

  async function onSubmit(data: z.infer<typeof FirstFormSchema>) {
    onUpdateSpace(data); // Update the space state with form data
    nextStep();
    toast.success("First step submitted!");
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Space Name</FormLabel>
                <FormControl>
                  <Input placeholder="Space name..." {...field} />
                </FormControl>
                <FormDescription>Add a space name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Space Purpose</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="collaboration"
                        id="collaboration"
                      />
                      <Label htmlFor="collaboration">Collaboration</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="announcements"
                        id="announcements"
                      />
                      <Label htmlFor="announcements">Announcements</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="privacy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Space Privacy</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public">Public</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private">Private</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <StepperFormActions />
        </form>
      </Form>
    </div>
  );
}
function SecondStepForm({
  onUpdateSpace,
}: {
  onUpdateSpace: (data: any) => void;
}) {
  const { users } = useUser();
  const { nextStep } = useStepper();
  const [values, setValues] = useState<string[]>([]);

  const form = useForm({
    defaultValues: {
      users: [""],
    },
  });

  const addUser = (email: string) => {
    if (!values.includes(email)) {
      setValues([...values, email]);
      form.setValue("users", [...values, email]);
    } else {
      removeUser(email);
    }
  };

  function onSubmit(data: any) {
    onUpdateSpace(data);
    nextStep();
    toast.success("Second step submitted!");
  }

  const removeUser = (email: string) => {
    setValues(values.filter((user) => user !== email));
    form.setValue(
      "users",
      values.filter((user) => user !== email)
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <SearchInput commands={users} onSelect={addUser} />
          {values.map(
            (user, index) =>
              user && (
                <div
                  key={index}
                  className="flex items-center justify-between p-2"
                >
                  <span>{user}</span>
                  <Button
                    variant="outline"
                    onClick={() => removeUser(user)}
                    aria-label={`Remove ${user}`}
                  >
                    <X size={16} />
                  </Button>
                </div>
              )
          )}
        </div>
        <StepperFormActions />
      </form>
    </Form>
  );
}

function StepperFormActions() {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
  } = useStepper();

  return (
    <div className="w-full flex justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="sm" type="button" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size="sm"
            variant="secondary"
            type="button"
          >
            Prev
          </Button>
          <Button size="sm" type="submit">
            {isLastStep ? "Finish" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
}

function MyStepperFooter({ space }: { space: any }) {
  const { activeStep, steps, resetSteps } = useStepper();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: createSpace,
    onSuccess: (data) => {
      if (data.data) {
        router.push("/messages/group");
      }
    },
  });
  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button onClick={resetSteps} className="gap-2" variant={"destructive"}>
        Reset <X />
      </Button>
      <Button
        onClick={() => {
          mutate(space);
        }}
        className="gap-2"
        variant={"default"}
      >
        Create Space <Check />
      </Button>
    </div>
  );
}
