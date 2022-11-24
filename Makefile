SHELL := /bin/bash

build:
	docker build --progress=plain -t jumorap/sia_academica_ag .
