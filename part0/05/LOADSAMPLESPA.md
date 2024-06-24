## Sequence Diagram for load example spa

```mermaid
    sequenceDiagram
        participant browser
        participant server


        note right of browser: Browser requests the example app body from the server
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
        activate server
        server-->>browser: HTML document
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: the css file
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
        activate server
        server-->>browser: the JavaScript file
        deactivate server

        Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: [{ "content": "Any note", "date": "2023-1-1" }, ... ]
        deactivate server
        Note right of browser: JavaScript saves the notes in an array "notes"
        Note right of browser: JavaScript renders the notes saved in the array
```

### Important note: The example of a sequence diagram given by Full Stack Open was used as a reference: https://fullstackopen.com/en/part0/fundamentals_of_web_apps#loading-a-page-containing-java-script-review