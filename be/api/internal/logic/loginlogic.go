package logic

import (
	"context"
	"time"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/api/internal/utils"
	"da-tour/common"

	"github.com/zeromicro/go-zero/core/logx"
)

type LoginLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewLoginLogic(ctx context.Context, svcCtx *svc.ServiceContext) *LoginLogic {
	return &LoginLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *LoginLogic) Login(req *types.LoginReq) (resp *types.LoginRes, err error) {
	l.Logger.Infof("Login request: %v", req)

	var user types.User
	var iat = time.Now().Unix()
	var accessSecret = l.svcCtx.Config.Auth.AccessSecret
	var accessExpire = l.svcCtx.Config.Auth.AccessExpire

	// Check if the user exists
	userModel, err := l.svcCtx.UserTblModel.FindOneByEmail(l.ctx, req.Email)
	if err != nil {
		l.Logger.Error(err)
		return &types.LoginRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	if userModel == nil {
		return &types.LoginRes{
			Result: types.Result{
				Code:    common.USER_NOT_FOUND_CODE,
				Message: common.USER_NOT_FOUND_MESS,
			},
		}, nil
	}

	user = types.User{
		UserID:      userModel.Id,
		Email:       userModel.Email,
		Role:        userModel.Role,
		Status:      userModel.Status,
		FullName:    userModel.FullName.String,
	}

	// Check if the password is correct
	if !utils.ConfirmPassword(req.Password, userModel.PasswordHash) {
		return &types.LoginRes{
			Result: types.Result{
				Code:    common.INVALID_PASSWORD_CODE,
				Message: common.INVALID_PASSWORD_MESS,
			},
		}, nil
	}

	// Generate token
	token, err := utils.GetJwtToken(utils.JwtTokenInput{
		SecretKey: accessSecret,
		Iat:       iat,
		Seconds:   accessExpire,
		UserID:    user.UserID,
		Payload:   user,
	})
	if err != nil {
		l.Logger.Error(err)
		return &types.LoginRes{
			Result: types.Result{
				Code:    common.UNKNOWN_ERR_CODE,
				Message: common.UNKNOWN_ERR_MESS,
			},
		}, nil
	}

	l.Logger.Info("Login success")
	return &types.LoginRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
		Token: token,
		User:  user,
	}, nil
}
