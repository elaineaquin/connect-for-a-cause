import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ViewIntroProps } from "./ViewIntro";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/server/profile";
import { toast } from "sonner";
import { verifySession } from "@/server/session";

interface EditIntroForm {
  onSubmit: () => void;
  onClear: () => void;
}

const EditIntroForm = ({
  currentCity,
  hometown,
  instagram,
  facebook,
  linkedIn,
  higherEducation,
  lowerSecondaryEducation,
  primaryEducation,
  upperSecondaryEducation,
  onSubmit,
  onClear,
}: ViewIntroProps & EditIntroForm) => {
  const { mutate: update } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      window.location.reload();
      onSubmit();
    },
    onError: (err) => {
      toast.error(`Something went wrong ${err}`);
    },
  });

  const form = useForm({
    defaultValues: {
      currentCity: currentCity || "",
      hometown: hometown || "",
      instagram: instagram || "",
      facebook: facebook || "",
      linkedIn: linkedIn || "",
      higherEducation: higherEducation || "",
      lowerSecondaryEducation: lowerSecondaryEducation || "",
      primaryEducation: primaryEducation || "",
      upperSecondaryEducation: upperSecondaryEducation || "",
    },
  });

  const onHandleChangeProfile = async (data: any) => {
    try {
      const { userId } = await verifySession();
      update({ userId, data });
    } catch (error) {
      console.error(`Something went wrong ${error}`);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-2"
        onSubmit={form.handleSubmit(onHandleChangeProfile)}
      >
        <Separator className="my-2" />
        <h3>Place</h3>
        <FormField
          control={form.control}
          name="currentCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current City</FormLabel>
              <FormControl>
                <Input placeholder="I am currently living in..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hometown"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hometown</FormLabel>
              <FormControl>
                <Input placeholder="I grew up in..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator className="my-2" />
        <h3>Socials</h3>
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input placeholder="@instagram.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook</FormLabel>
              <FormControl>
                <Input placeholder="@facebook.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input placeholder="@linkedIn.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator className="my-2" />
        <h3>Education</h3>
        <FormField
          control={form.control}
          name="primaryEducation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Education</FormLabel>
              <FormControl>
                <Input placeholder="I went to... " {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lowerSecondaryEducation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lower Secondary Education</FormLabel>
              <FormControl>
                <Input placeholder="I went to... " {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="upperSecondaryEducation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upper Secondary Education</FormLabel>
              <FormControl>
                <Input placeholder="I went to... " {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="higherEducation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Higher Education</FormLabel>
              <FormControl>
                <Input
                  placeholder="I took higher education at... "
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onClear()}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditIntroForm;
