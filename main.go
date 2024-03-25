package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func timeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, time.Now().Format("02 Jan 2006 15:04:05 MST"))
}

func main() {
	initTemplates()

	go startServer()
	waitForReload()
}

func startServer() {
	http.HandleFunc("/time", timeHandler)
	http.HandleFunc("/refresh", refreshHandler)
	//http.HandleFunc("/htmlData", saveHtmlData)
	http.Handle("/", http.FileServer(http.Dir("public/")))

	port := "localhost:9999"
	go log.Fatal(http.ListenAndServe(port, nil))
}
