package handler

import (
	"net/http"

	"da-tour/api/internal/logic"
	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func FilterOrderHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.FilterOrderReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := logic.NewFilterOrderLogic(r.Context(), svcCtx)
		resp, err := l.FilterOrder(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
