"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export function InquiryForm({ product }: { product?: string }) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState("")

  return (
    <form
      id="inquiry"
      className="inquiry-form"
      onSubmit={async (event) => {
        event.preventDefault()
        setState("submitting")
        setError("")
        const response = await fetch("/api/inquiries", {
          method: "POST",
          body: new FormData(event.currentTarget),
        })
        if (response.ok) {
          setState("success")
          event.currentTarget.reset()
          return
        }
        const payload = await response.json().catch(() => ({ error: "Inquiry submission failed." }))
        setError(payload.error || "Inquiry submission failed.")
        setState("error")
      }}
    >
      <div className="form-grid">
        <label>
          Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Company
          <input name="company" placeholder="Company name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required placeholder="name@company.com" />
        </label>
        <label>
          Phone / WhatsApp
          <input name="phone" placeholder="+1 000 000 0000" />
        </label>
        <label>
          Country / Region
          <input name="country" placeholder="Country / Region" />
        </label>
        <label>
          Product Interest
          <input name="product" defaultValue={product ?? ""} placeholder="Food storage container series" />
        </label>
      </div>
      <label>
        Estimated Quantity
        <input name="quantity" placeholder="Estimated order quantity" />
      </label>
      <label>
        Custom Requirements
        <textarea name="requirements" rows={4} placeholder="Size, material, lid structure, color, packaging, or other requirements" />
      </label>
      <label>
        Message
        <textarea name="message" rows={4} required placeholder="Tell us about your sourcing plan" />
      </label>
      <div className="upload-placeholder">File upload placeholder for drawings, packaging references, or product briefs</div>
      <button type="submit" className="primary-action" disabled={state === "submitting"}>
        {state === "submitting" ? "Submitting..." : "Submit Inquiry"} <Send size={16} />
      </button>
      {state === "success" ? (
        <p className="success-state">Thank you. Your inquiry has been received by the JINFANWAN team.</p>
      ) : null}
      {state === "error" ? (
        <p className="error-state">{error}</p>
      ) : null}
    </form>
  )
}
