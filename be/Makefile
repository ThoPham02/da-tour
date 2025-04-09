ROOT_DIR=$(shell pwd)
OUT_DIR=$(ROOT_DIR)/out
LOGS_DIR=$(ROOT_DIR)/logs

MODULE_NAME=da-tour
SERVICE_DIR=$(ROOT_DIR)
API_DIR=$(ROOT_DIR)
SCHEMA_DIR=$(ROOT_DIR)

MAIN_DIR=$(SERVICE_DIR)
MAIN_API_DIR=$(MAIN_DIR)/api
MAIN_MODEL_DIR=$(MAIN_DIR)/model

# goctl
dep-init:
	go mod init $(MODULE_NAME)
	go mod tidy
dep:
	go mod tidy

gen-service:
	goctl api go -api $(API_DIR)/main.api -dir $(MAIN_API_DIR)

gen-model:
	goctl model mysql ddl -src="${SCHEMA_DIR}/schema.sql" -dir="${MAIN_MODEL_DIR}" --ignore-columns=""

run:
	go run ./api/main.go