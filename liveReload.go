package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/fsnotify/fsnotify"
)

type HtmlData struct {
	Html string `json:"html"`
	Css  string `json:"css"`
	Js   string `json:"js"`

	// Add other fields as needed
}

var lastOverwrite int64
var writer *http.ResponseWriter = nil
var fwTemplate string
var fwStyles string

func initTemplates() {

	// Read the entire file into a []byte
	htmlPath, _ := filepath.Abs("templates/framework.html")
	fileContent, _ := ioutil.ReadFile(htmlPath)
	fwTemplate = string(fileContent)

	cssPath, _ := filepath.Abs("templates/fwStyles.css")
	fileContent, _ = ioutil.ReadFile(cssPath)
	fwStyles = string(fileContent)

	//println(fwTemplate)
}

func waitForReload() {

	path, _ := os.Getwd()
	folderPath := filepath.Join(path, "public")

	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}
	defer watcher.Close()

	err = filepath.Walk(folderPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() {
			return nil
		}
		return watcher.Add(path)
	})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Watching folder: %s\n", folderPath)

	for {
		select {
		case event, ok := <-watcher.Events:
			if !ok {
				return
			}
			handleEvent(event)
		case err, ok := <-watcher.Errors:
			if !ok {
				return
			}
			log.Println("Error:", err)
		}
		//time.Sleep(10 * time.Millisecond)
	}
}

func handleEvent(event fsnotify.Event) {
	if writer != nil {
		if lastOverwrite+200 < time.Now().UnixMilli() {
			fmt.Fprintf(*writer, "data: Refresh Page\n\n")
			(*writer).(http.Flusher).Flush()
		}
	}

	/*switch {
	case event.Op&fsnotify.Create == fsnotify.Create:
		fmt.Printf("File created: %s\n", event.Name)
	case event.Op&fsnotify.Write == fsnotify.Write:
		fmt.Printf("File modified: %s\n", event.Name)
	case event.Op&fsnotify.Remove == fsnotify.Remove:
		fmt.Printf("File deleted: %s\n", event.Name)
	case event.Op&fsnotify.Rename == fsnotify.Rename:
		fmt.Printf("File renamed: %s\n", event.Name)
	case event.Op&fsnotify.Chmod == fsnotify.Chmod:
		fmt.Printf("File permissions changed: %s\n", event.Name)
	}*/
}

func refreshHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Content-Type", "text/event-stream")

	writer = &w

	for {
		time.Sleep(2 * time.Second)
	}

}

func saveHtmlData(w http.ResponseWriter, r *http.Request) {
	lastOverwrite = time.Now().UnixMilli()

	body, _ := ioutil.ReadAll(r.Body)
	var data HtmlData
	json.Unmarshal(body, &data)

	html := insertToFileContent(fwTemplate, []string{(data.Html[6 : len(data.Html)-7])})
	htmlPath, _ := filepath.Abs("public/index.html")
	ioutil.WriteFile(htmlPath, []byte(html), 0644)

	css := insertToFileContent(fwStyles, []string{data.Css})
	cssPath, _ := filepath.Abs("public/index.css")
	ioutil.WriteFile(cssPath, []byte(css), 0644)
}

func insertToFileContent(content string, inserts []string) string {
	scanner := bufio.NewScanner(strings.NewReader(content))
	var newContent string
	//println(content)

	i := 0
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) > 2 && line[0] == '/' && line[1] == '*' && line[2] == '!' {
			newContent += inserts[i]
			i++
		} else {
			newContent += line + "\n"
		}
	}
	//println(newContent)
	return newContent
}
