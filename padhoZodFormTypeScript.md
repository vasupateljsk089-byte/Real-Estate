# 🧠 Understanding `useZodForm` + Zod + TypeScript (Full Mental Model)

This document explains **every single concept** behind using Zod with a custom form hook.
No magic. No shortcuts.

---

## 1️⃣ The Problem We Are Solving

In a form, we need:

1. Store form values
2. Show validation errors
3. Validate before submit
4. Keep TypeScript types correct

React alone does NOT solve this.
Zod alone does NOT manage state.

So we combine them.

---

## 2️⃣ Zod Schema — The Source of Truth

```ts
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  username: z.string().min(3),
  password: z.string().min(8),
});


What this is:

Runtime validator

Runs in the browser

Decides if data is valid

Zod ≠ TypeScript
Zod runs at runtime, TS runs at compile time.

3️⃣ z.infer — The Most Important Concept
export type RegisterForm = z.infer<typeof registerSchema>;


What happens here:

typeof registerSchema → get the type of the variable

z.infer<...> → extract the output type of the schema

Result:

type RegisterForm = {
  email: string;
  username: string;
  password: string;
};


Why this matters:

No duplicated types

Schema changes → types update automatically

Zero drift

Schema → Type (never the other way around)

4️⃣ Why the “expected string, received undefined” Error Happens

Zod expects:

email: string


But React form state starts as:

{}


So initially:

values.email === undefined


Zod is correct to fail.

✅ Fix: initialize values
const initialValues = {
  email: "",
  username: "",
  password: "",
};


// This is WHY initialValues exists.

// 5️⃣ What useZodForm Actually Is

Signature (conceptually):

function useZodForm<T>(
  schema: ZodType<T>,
  initialValues: T
)


// Meaning:

// This hook manages form data of type T, validated by a Zod schema that outputs T.

// Example:

T = RegisterForm
schema = registerSchema
initialValues = { email: "", username: "", password: "" }

// 6️⃣ Internal State
// A. Form Values
const [values, setValues] = useState(initialValues);


// Always defined

// Matches schema

// No undefined errors

// B. Errors State
const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});


// Meaning:

// Keys = form fields

// Values = error messages

// Partial → not all fields have errors

// Example:

{ email: "Invalid email" }

// 7️⃣ register — NOT FROM ZOD
const register = (name: keyof T) => ({
  name,
  value: values[name],
  onChange,
  onBlur,
});


// Important:

// ❌ NOT from Zod

// ❌ NOT built-in

// ✅ You created this

// Inspired by react-hook-form.

// 8️⃣ How register Works
<input name="email" />


// Mostly semantic / debugging.

value={values[name]}


// This makes the input controlled.
// React owns the state.

onChange={(e) => {
  setValues(prev => ({
    ...prev,
    [name]: e.target.value,
  }));
}}


// Runs on every keystroke

// Updates only the current field

// onBlur — Field-Level Validation

onBlur={() => {
  const result = schema.safeParse(values);
}}


// Why blur?

// Better UX

// No aggressive validation

// Industry standard

// If invalid:

// Zod returns issues

// We extract only the issue for this field

// Store error message

// If valid:

// Clear error for this field

// 9️⃣ validateForm — Submit Validation
const validateForm = () => {
  const result = schema.safeParse(values);

  if (!result.success) {
    const newErrors: Partial<Record<keyof T, string>> = {};

    result.error.issues.forEach(issue => {
      newErrors[issue.path[0] as keyof T] = issue.message;
    });

    setErrors(newErrors);
    return false;
  }

  setErrors({});
  return true;
};


// What this does:

// Validates ALL fields

// Shows ALL errors

// Blocks submit if invalid

// 🔟 Full Flow

Typing:

onChange

update state

no validation

Blur:

validate schema

show error for that field only

Submit:

validateForm

if invalid → block submit

if valid → API call

This is how professional forms work.

// 1️⃣1️⃣ Why Not Just Use react-hook-form?

Honest answer: you should in production.

RHF already gives:

State management

Performance optimizations

Zod integration

Example:

useForm({
  resolver: zodResolver(registerSchema),
  mode: "onBlur",
});


We did this manually so you understand what’s happening.

1️⃣2️⃣ Why RegisterForm ≠ SignupPayload

Form type:

UI concerns

Validation

User input

API payload:

Backend contract

Independent evolution

Example:

type SignupPayload = {
  email: string;
  password: string;
  role: "user";
};


This separation is GOOD architecture.

🧠 Final Mental Model (Lock This In)

Zod Schema
↓
z.infer
↓
Form Type
↓
useZodForm
↓
UI Inputs
↓
SignupPayload
↓
API

Never reverse this.

✅ Final Answers

register → your helper, not Zod

Undefined error → values not initialized

z.infer → runtime schema → compile-time type

Custom hook → learning + reuse

RHF → best for production

You built a mini react-hook-form.
That’s advanced frontend engineering.

🚀


---

If you want next, I can:
- Convert this into **docs-quality README**
- Turn it into a **blog post**
- Rewrite it as **learning notes**
- Or refactor it to **react-hook-form version**

Just say the word 🤝

```
```ts
import { useState } from "react";
import type { ZodType } from "zod";

export function useZodForm<T>(
  schema: ZodType<T>,
  initialValues: T
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof T, string>>
  >({});

  const register = (name: keyof T) => ({
    name,
    value: values[name],

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    },

    onBlur: () => {
      const result = schema.safeParse(values);

      if (!result.success) {
        const issue = result.error.issues.find(
          (i) => i.path[0] === name
        );
        setErrors((prev) => ({
          ...prev,
          [name]: issue?.message,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
  });

  const validateForm = () => {
    const result = schema.safeParse(values);

    if (!result.success) {
      const newErrors: Partial<Record<keyof T, string>> = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as keyof T] =
          issue.message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  return {
    values,
    errors,
    register,
    validateForm,
  };
}
```

Totally normal confusion 👍
This is pure TypeScript fundamentals, and once it clicks, a LOT of your form logic will make sense.

I’ll explain this slowly, with plain English, small examples, and then relate it back to your form.

1️⃣ First:
```
what is Record<K, V>?
Definition
Record<K, V>
```
means:

An object whose keys are K and whose values are V.

Think of it as a shortcut for an object type.

Example 1 – Record<string, string>
type A = Record<string, string>;


Means:
```
{
  [anyKey: string]: string;
}

const obj: A = {
  name: "Vasu",
  email: "vasu@gmail.com",
  anything: "allowed",
};
```
What it means in English:

“Any string key is allowed, and its value must be a string.”

⚠️ Downside

No type safety on keys

Typos are allowed
```
obj.emial = "oops"; // ❌ TypeScript allows this
```
2️⃣ What is keyof T?

Let’s say:
```
type RegisterForm = {
  username: string;
  email: string;
  password: string;
};
```

Then:

keyof RegisterForm


becomes:
```
"username" | "email" | "password"
```
Meaning:

“All the keys of this object type.”

3️⃣ Record<keyof T, string>

Now combine them:
```
Record<keyof T, string>
```
Example:
```
Record<"username" | "email" | "password", string>
```

Which expands to:
```
{
  username: string;
  email: string;
  password: string;
}
```
🎯 English meaning:

“An object where the keys must be exactly the keys of T, and the values are strings.”

Example in forms (VERY important)
```
const errors: Record<keyof RegisterForm, string> = {
  username: "Too short",
  email: "Invalid email",
  password: "Weak password",
};
```

✔ Perfect mapping
✔ No extra keys allowed
✔ No missing keys allowed

⚠️ Why we usually use Partial<>
Partial<Record<keyof T, string>>


Because not every field has an error at the same time.

This means:
```
{
  username?: string;
  email?: string;
  password?: string;
}
```

Example:
```
{
  email: "Invalid email"
}
```
4️⃣ Compare side-by-side
Type	Meaning	Safety
```
Record<string, string>	Any key allowed	❌ Unsafe
Record<keyof T, string>	Only known keys	✅ Safe
Partial<Record<keyof T, string>>	Optional known keys	✅ Best
```
5️⃣ Why this matters in your useZodForm
Your code:
```ts
const [errors, setErrors] = useState<
  Partial<Record<keyof T, string>>
>({});

```
Meaning:

Keys must be valid form fields

Values are error messages

Not all fields need errors

Prevents bugs like:
```
setErrors({ emial: "wrong" }); // ❌ TypeScript error
```
6️⃣ Why NOT use Record<string, string> for errors?

Because this would be allowed:
```
setErrors({
  randomKey: "Some error",
});
```

Your UI would:

never display it

silently fail

cause confusion

7️⃣ Real-world analogy 🧠

Think of:
```
Record<string, string>
```
as:

“Any drawer, put anything in.”

Think of:
```
Record<keyof T, string>
```

as:

“Only labeled drawers, and each drawer holds a string.”

8️⃣ Final takeaway (lock this in)
🟢 Use this for form errors
Partial<Record<keyof T, string>>

🔴 Avoid this for form errors
Record<string, string>

🧠 One-line rule to remember

If keys come from your data model → use keyof T.

If you want next:

why keyof + generics are powerful

how Zod errors map to this type

how RHF uses similar patterns internally

