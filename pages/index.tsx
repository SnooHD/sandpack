import { Button } from "@/components/UI/Button.component";
import { Input } from "@/components/Form/Input.component";
import { Logo } from "@/components/UI/Logo.component";
import { Title } from "@/components/Text/Title.component";
import { useForm } from "@/hooks/useForm.hook";
import React, { ReactNode } from "react";

const Page = (): ReactNode => {
  const { onSubmit, formError } = useForm();

  return (
    <main className="flex w-full h-full items-center max-w-content px-sm sm:px-lg">
      <div className="w-full flex flex-col lg:flex-row justify-between space-y-lg lg:space-y-0 lg:space-x-lg">
        <Logo className="max-w-logo max-h-logo" />
        <div className="w-full flex-col lg:max-w-block space-y-xl">
          <Title className="w-full">
            <>
              Start by pasting the <br className="hidden xs:block" />
              repository URL.
            </>
          </Title>
          <form
            onSubmit={onSubmit}
            className={`
              flex flex-col space-y-sm w-full items-start
              xs:flex-row xs:space-x-sm xs:space-y-0
            `}
          >
            <Input
              placeholder="https://"
              name="url"
              className="flex-grow"
              error={formError}
              required={true}
              label="Enter your github URL"
            />
            <Button
              type="submit"
              className="w-full xs:w-auto"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page;
