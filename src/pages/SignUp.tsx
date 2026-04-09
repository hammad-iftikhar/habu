import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { useAlert } from "@/hooks/use-alert";
import signUpFormSchema from "@/schema/forms/signup";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { signUp } from "@/api/user";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const alert = useAlert();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signUpFormSchema,
    },
    onSubmit: async () => {
      setLoading(true);
      alert.hide();

      try {
        const response = await signUp(
          form.state.values.email,
          form.state.values.password,
        );

        if (response.status) {
          alert.showSuccess(response.message);
          form.reset();
        } else {
          alert.showError(response.message);
        }
      } catch {
        alert.showError("Network error. Please try again later.");
      }

      setLoading(false);
    },
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col gap-5">
      <img src={logo} alt="Logo" className="w-24 h-24" />
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <alert.AlertComponent className="max-w-sm" />
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Sign up for an account</CardTitle>
            <CardDescription>Create an account to get started</CardDescription>
            <CardAction>
              <Button variant="link" onClick={() => navigate("/login")}>
                Login
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form
              id="sign-up-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="m@example.com"
                          autoComplete="username"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="password"
                            aria-invalid={isInvalid}
                            autoComplete="new-password"
                          />
                        </InputGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="confirmPassword"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Confirm Password
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="password"
                            aria-invalid={isInvalid}
                            autoComplete="new-password"
                          />
                        </InputGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              form="sign-up-form"
              loading={loading}
            >
              Sign Up
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
