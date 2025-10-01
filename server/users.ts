import { user } from "@/auth-schema";
import { db } from "@/db/drizzle";
import { User } from "@/db/schema";
import { authClient } from "@/lib/auth-client"; //import the auth client

interface SignUpEmailProps {
  email: string;
  password: string;
  name: string;
}

export const SignUpEmail = async ({
  name,
  email,
  password,
}: SignUpEmailProps) => {
  const { data, error } = await authClient.signUp.email(
    {
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
      callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
    },
    {
      onRequest: () => {
        //show loading
      },
      onSuccess: () => {
        //redirect to the dashboard or sign in page
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    }
  );
  if (error) {
    return { error: error.message };
  }
  return { data };
};

interface SignInEmailProps {
  email: string;
  password: string;
}

export const SignInEmail = async ({ email, password }: SignInEmailProps) => {
  const { data, error } = await authClient.signIn.email(
    {
      email, // user email address
      password, // user password -> min 8 characters by default
      callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
    },
    {
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    }
  );
  if (error) {
    return { error: error.message };
  }
  return { data };
};

export const SignOut = async () => {
  await authClient.signOut({
    query: {
      callbackURL: "/login",
    },
    fetchOptions: {
      onSuccess: () => {
        alert("Logout Successful"); // redirect to login page
      },
    },
  });
};


export const getListUser = async (): Promise<User[]> => {
  const users = await db.query.user.findMany({
    columns: { id: true, name: true, email: true },
  });
  return users;
};