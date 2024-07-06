"use client";

import { updateValidationStatus } from "@/lib/db";
import { ValidationStatus } from "@/lib/types";
import { useFormState } from "react-dom";

export interface ValidationStatusSelectorProps {
  validationStatus?: ValidationStatus;
  documentId: string;
}

export default function ValidationStatusSelector({
  validationStatus,
  documentId,
}: ValidationStatusSelectorProps) {
  return (
    <>
      <label htmlFor="validationStatus" className="pr-1">
        Status:
      </label>
      <select
        style={{ width: 300 }}
        className="border-2"
        name="validationStatus"
        id="validationStatus"
        defaultValue={validationStatus || ValidationStatus.ToReview}
        onChange={async (e) => {
          await updateValidationStatus(
            e.target.value as ValidationStatus,
            documentId
          );
        }}
      >
        {[ValidationStatus.ToReview, ValidationStatus.Validated].map((v, i) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </>
  );
}
