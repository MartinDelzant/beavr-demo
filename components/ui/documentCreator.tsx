"use client";

import { addDocument } from "@/lib/db";
import { ValidationStatus } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";

export interface DocumentCreatorProps {
  documentTypeId: string;
}

const initialState = {
  message: "",
};

function getNextYearDate() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDay().toString().padStart(2, "0");

  return `${nextYear}-${month}-${day}`;
}

export default function DocumentCreator({
  documentTypeId,
}: DocumentCreatorProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const addLocalDocument = async (
    prevState: { message: string },
    formData: FormData
  ) => {
    await addDocument(prevState, formData, documentTypeId);
    startTransition(() => {
      router.replace("/documents");
    });
  };
  const [state, formAction] = useFormState(
    addLocalDocument as any,
    initialState
  );
  const { pending } = useFormStatus();
  const dateSelectorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dateSelectorRef.current) {
      dateSelectorRef.current.value = getNextYearDate();
    }
  }, []);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-y-2 ml-10 mr-10 pt-10"
    >
      <span className="text-xl font-semibold">New Document : </span>
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        name="content"
        className="border-2"
        rows={5}
        required
      />
      <label htmlFor="validationStatus">Validation Status</label>
      <select
        style={{ width: 300 }}
        className="border-2"
        name="validationStatus"
        id="validationStatus"
      >
        {[ValidationStatus.ToReview, ValidationStatus.Validated].map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
      <label htmlFor="expirationDate">Expiration Date</label>
      <input
        ref={dateSelectorRef}
        id="expirationDate"
        name="expirationDate"
        className="border-2"
        type="date"
        required
      />
      <button
        type="submit"
        aria-disabled={pending}
        className="border-2 round p-2 text-xl font-semibold mt-2"
        style={{ maxWidth: 100 }}
      >
        Create
      </button>
      <div role="status" className="text-red-600">
        {state?.message}
      </div>
    </form>
  );
}
