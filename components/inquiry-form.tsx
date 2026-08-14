"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export function InquiryForm({ product }: { product?: string }) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      id="inquiry"
      className="inquiry-form"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
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
        <textarea name="message" rows={4} placeholder="Tell us about your sourcing plan" />
      </label>
      <div className="upload-placeholder">File upload placeholder for drawings, packaging references, or product briefs</div>
      <button type="submit" className="primary-action">
        Submit Inquiry <Send size={16} />
      </button>
      {submitted ? (
        <p className="success-state">Thank you. Your inquiry draft is ready for the production Supabase connection step.</p>
      ) : null}
    </form>
  )
}
