import ReactDOMServer from "react-dom/server";

export function ReactToDomNode (document, reactElement) {

    return document.createRange().createContextualFragment(ReactDOMServer.renderToString(reactElement));
}