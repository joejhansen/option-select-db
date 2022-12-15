import React from "react"
import ContentLoader from "react-content-loader"

const CardLoader = (props) => (
    <ContentLoader
        speed={2}
        width={300}
        height={300}
        viewBox="0 0 300 300"
        backgroundColor="#202124"
        foregroundColor="#303134"
        {...props}
    >
        <rect x="1" y="7" rx="6" ry="6" width="284" height="240" />
    </ContentLoader>
)

export default CardLoader

