---
layout: post
title:  "RFC: (Commake) Common Makefile v0.0.1"
date:   2022-03-09 12:00:00
categories: commake common makefile
---

# Summary

This is a file to have in all software projects to create a common way of running parts of a projects life cycle. Without having to remember commands or read documents/README.md.

This page currently reflects my first iteration of this idea. Hopefully, to be improved. See the [contributing][#Contributing] section about raising ideas.

# Introduction

I find occasionally I come back to projects and can no longer remember how to set them up so they run. On some projects, the commands have not been added to the README and passed between people. Other times on a personal project I forget to write them down.

## An example

If I come back to a Node project, this is my thought process:
* Does this project use yarn or npm?
* Have I got the correct version of node installed?
* Do I need to do an install?
* Do I need to set environment variables?
* How do I serve this? npm run start, npm run serve, npm run dev?

All of this can be solved by using a common makefile across all your projects. Under the new world this would become the following:

1. `make init`
1. `make install`
1. `make run`

# Specification

This is a version with nothing implemented:

```
all: lint test run #help Full check

help:
	@echo "-- HELP --"
	@grep '#[h]elp' makefile

init: #help Run through dependencies and check
	@echo Not Implemented

install: #help Install packages
	@echo Not Implemented

build: #help Bulid the project files
	@echo Not Implemented

run: #help Run Locally
	@echo Not Implemented

lint: #help Run linting
	@echo Not Implemented

test: #help Run the unit tests
	@echo Not Implemented

e2e: #help Run the e2e tests
	@echo Not Implemented

plan: #help Plan to run any infra changes
	@echo Not Implemented

deploy: #help Run any infra changes
	@echo Not Implemented

```

The idea is not that these become really fancy, often they are just one line. See the [examples section][#Examples].

# Examples

* [Golang][goexample]

# Contributing

This project requires more thought on the following areas:
* Make this page more comprehensive and explain the ideas better.
* Add missing common life cycle steps.
* Explain Makefiles
* How do you add additional steps or different things?
  * eg. run:otherstep
* Collecting user input in a nice way.
  * Not storing data in the make file. E.g. make deploy location=prod
* How does this work in the windows world, without make or bash?

# About
This was created originally by Niall Bunting. If you would like to leave feedback please raise an issue on [Github][github].

# Licence
[Creative Commons ― CC BY 3.0][exapple]


[goexample][https://raw.githubusercontent.com/NiallBunting/dotfiles/master/makefile]
[github]: https://github.com/NiallBunting/niallbunting.github.io
[creativecommons]: https://creativecommons.org/licenses/by/3.0/
