import React from "react"

export function Loader({ type = "small" }) {
    return (
        <span className={type == "small" ? "smallLoader" : "largeLoader"}></span>
    )
}