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
import { useNavigate } from "react-router-dom";
import { useForm } from "@tanstack/react-form";
import loginFormSchema from "@/schema/forms/login";
import { useState } from "react";
import { useAlert } from "@/hooks/use-alert";
import { useAuth } from "@/contexts/AuthContext";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";

export default function Login() {
  const navigate = useNavigate();
  const alert = useAlert();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async () => {
      setLoading(true);
      alert.hide();

      try {
        const response = await login(
          form.state.values.email,
          form.state.values.password,
        );

        if (response.status) {
          form.reset();
          navigate("/dashboard");
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
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your credentials below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form
              id="login-form"
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
                            autoComplete="password"
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
              form="login-form"
              disabled={loading}
              className="w-full"
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
