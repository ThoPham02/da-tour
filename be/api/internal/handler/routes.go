// Code generated by goctl. DO NOT EDIT.
package handler

import (
	"net/http"

	"da-tour/api/internal/svc"

	"github.com/zeromicro/go-zero/rest"
)

func RegisterHandlers(server *rest.Server, serverCtx *svc.ServiceContext) {
	server.AddRoutes(
		[]rest.Route{
			{
				Method:  http.MethodPost,
				Path:    "/login",
				Handler: LoginHandler(serverCtx),
			},
			{
				Method:  http.MethodPost,
				Path:    "/register",
				Handler: RegisterHandler(serverCtx),
			},
		},
		rest.WithPrefix("/"),
	)
}
