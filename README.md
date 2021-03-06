# searx-term
Tool for searching in searx from terminal. Written in node.js.
UPD: It turns out to be a bad idea to use such client, consider using [this](https://github.com/ik9999/popupsearch).

### Screenshot
![searx-term](https://cloud.githubusercontent.com/assets/6804575/12012457/bafc48de-ad05-11e5-9986-9b473b969bad.gif "searx-term")

### Requirements
* Node.js
* npm

### Latest build
[Version 0.0.1](https://github.com/ik9999/searx-term/releases/download/v0.0.1/0.0.1.zip)

### Featues
* Searching
* Autocomplete queries
* Preferences GUI

### Installation
* Download latest build
* Unpack it
* Install dependencies
```
$ ./setup.sh
```
* Run
```
$ ./run.sh
```

### Gulp tasks
Build:
```
$ gulp build
```
Release:
```
$ gulp release
```

### Troubleshooting
##### Incorrect colors

Add
```
export TERM="xterm-256color"
```
to ~/.bashrc(.zshrc if you are using zsh or your shell's startup script).

### Todo
* Better design
* Saving search history
* Browsing search history
* Multiple domains(using random)
* Keep search history on remote server(?)

### Dependencies
* [alt](https://www.npmjs.com/package/alt)
* [blessed](https://www.npmjs.com/package/blessed)
* [editor-widget](https://www.npmjs.com/package/editor-widget)
* [opn](https://www.npmjs.com/package/opn)
* [request](https://www.npmjs.com/package/request)
* [xregexp](https://www.npmjs.com/package/xregexp)
