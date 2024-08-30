import { signup } from "./actions";
import { useActionState } from "react";

export function SignuUpForm() {
  const [state, action, pending] = useActionState(signup);

  return (
    <form action={action}>
      <input type="text" name="firstName" />
      {state?.errors?.firstName && <p>{state.errors.firstName}</p>}
      <input type="text" name="lastName" />
      {state?.errors?.lastName && <p>{state.errors.lastName}</p>}

      <input type="text" name="email" />
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <input type="password" name="password" />
      {state?.errors?.password && <p>{state.errors.password}</p>}

      <input type="password" name="confirm" />
      {state?.errors?.confirm && <p>{state.errors.confirm}</p>}

      <button disabled={pending} type="submit">
        {pending ? "Inscription en cours..." : "S&apos;inscrire"}
      </button>
    </form>
  );
}
