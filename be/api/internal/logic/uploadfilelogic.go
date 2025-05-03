package logic

import (
	"context"
	"net/http"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/common"

	"github.com/zeromicro/go-zero/core/logx"
)

type UploadFileLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
	r      *http.Request
}

func NewUploadFileLogic(ctx context.Context, svcCtx *svc.ServiceContext, r *http.Request) *UploadFileLogic {
	return &UploadFileLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
		r:      r,
	}
}

func (l *UploadFileLogic) UploadFile(req *types.UploadFileReq) (resp *types.UploadFileRes, err error) {
	l.Logger.Info("UploadFile", req)

	file, _, err := l.r.FormFile("file")
	if err != nil {
		l.Logger.Error(err)
		return &types.UploadFileRes{
			Result: types.Result{
				Code:    common.INVALID_REQUEST_CODE,
				Message: common.INVALID_REQUEST_MESS,
			},
		}, nil
	}
	defer file.Close()

	// upload file to cloud
	url, err := l.svcCtx.CldClient.UploadImage(l.ctx, file, 1)
	if err != nil {
		l.Logger.Error(err)
		return &types.UploadFileRes{
			Result: types.Result{
				Code:    common.UNKNOWN_ERR_CODE,
				Message: common.UNKNOWN_ERR_MESS,
			},
		}, nil
	}

	l.Logger.Info("UploadFile Success")
	return &types.UploadFileRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
		Url: url,
	}, nil
}
