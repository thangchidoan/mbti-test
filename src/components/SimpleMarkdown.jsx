import React from "react";

const SimpleMarkdown = ({ text }) => {
  if (!text) return null;

  // Sanitize text to prevent XSS attacks
  const sanitizeText = (str) => {
    if (typeof str !== "string") return "";
    // Remove potentially dangerous characters and patterns
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
      .replace(/javascript:/gi, "")
      .replace(/<\/?[^>]+(>|$)/g, "");
  };

  const parseInlineStyles = (str) => {
    const sanitized = sanitizeText(str);
    const parts = sanitized.split(/(\*\*.*?\*\*)/);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-black">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const blocks = text.split(/\n\n+/);

  return (
    <div className="space-y-6 text-left">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (
          trimmed.startsWith("* ") ||
          trimmed.startsWith("- ") ||
          /^\d+\./.test(trimmed)
        ) {
          const items = trimmed.split("\n");
          return (
            <ul key={index} className="space-y-3 my-4">
              {items.map((item, i) => {
                const cleanItem = item
                  .replace(/^[*-]\s*/, "")
                  .replace(/^\d+\.\s*/, "");
                return (
                  <li
                    key={i}
                    className="text-neutral-700 flex items-start gap-3"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                    <span className="leading-relaxed">
                      {parseInlineStyles(cleanItem)}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }

        if (trimmed.startsWith("##")) {
          return (
            <h3 key={index} className="text-xl font-bold text-black mt-6 mb-2">
              {trimmed.replace(/^#+\s*/, "")}
            </h3>
          );
        }

        if (
          trimmed.startsWith("**") &&
          trimmed.endsWith("**") &&
          trimmed.length < 60
        ) {
          return (
            <h4 key={index} className="text-lg font-bold text-black mt-4 mb-2">
              {trimmed.replace(/\*\*/g, "")}
            </h4>
          );
        }

        return (
          <p
            key={index}
            className="text-neutral-600 leading-relaxed text-lg font-light"
          >
            {parseInlineStyles(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

export default SimpleMarkdown;
