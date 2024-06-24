## Sequence Diagram for creating a new note in the server

```mermaid
    sequenceDiagram
        participant browser
        participant server


        note right of browser: Browser requests the example app body from the server
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
        activate server
        server-->>browser: HTML document
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: the css file
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
        activate server
        server-->>browser: the JavaScript file
        deactivate server

        Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: [{ "content": "Any note", "date": "2023-1-1" }, ...]
        deactivate server

        Note right of browser: The browser executes the callback function that renders the notes

        note right of browser: The user texts a new note: { "content": "My new note", "date": "2024-06-23" } and presses the save button
        browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
        activate server
        note left of server: Server returns status code 302 and requests a redirect to https://studies.cs.helsinki.fi/exampleapp/notes
        server -->> browser: REDIRECT REQUEST https://studies.cs.helsinki.fi/exampleapp/notes
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
        activate server
        server-->>browser: HTML document
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: the css file
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
        activate server
        server-->>browser: the JavaScript file
        deactivate server

        Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: [{ "content": "Any note", "date": "2023-1-1" }, ... { "content": "My new note", "date": "2024-06-23" }]
        deactivate server

        Note right of browser: The browser executes the callback function that renders the notes
    
```


### Important note: The example of a sequence diagram given by Full Stack Open was used as a reference: https://fullstackopen.com/en/part0/fundamentals_of_web_apps#loading-a-page-containing-java-script-review