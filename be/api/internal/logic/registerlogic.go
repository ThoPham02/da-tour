package logic

import (
	"context"
	"database/sql"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/api/internal/utils"
	"da-tour/common"
	"da-tour/model"

	"github.com/zeromicro/go-zero/core/logx"
)

type RegisterLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewRegisterLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RegisterLogic {
	return &RegisterLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RegisterLogic) Register(req *types.RegisterReq) (resp *types.RegisterRes, err error) {
	l.Logger.Infof("Register request: %v", req)

	// Check if the email is already registered
	userModel, err := l.svcCtx.UserTblModel.FindOneByEmail(l.ctx, req.Email)
	if err != nil {
		l.Logger.Error(err)
		return &types.RegisterRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	if userModel != nil {
		return &types.RegisterRes{
			Result: types.Result{
				Code:    common.EMAIL_ALREADY_REGISTERED_CODE,
				Message: common.EMAIL_ALREADY_REGISTERED_MESS,
			},
		}, nil
	}

	// Hash the password
	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		l.Logger.Error(err)
		return &types.RegisterRes{
			Result: types.Result{
				Code:    common.UNKNOWN_ERR_CODE,
				Message: common.UNKNOWN_ERR_MESS,
			},
		}, nil
	}

	// Create a new user
	newUser := model.UserTbl{
		Id:           utils.GetTimeNow(),
		Email:        req.Email,
		PasswordHash: hashedPassword,
		Role:         common.USER_ROLE_USER,
		Status:       common.USER_STATUS_ACTIVE,
		FullName:     sql.NullString{String: req.Fullname, Valid: true},
		CreatedAt:    sql.NullInt64{Valid: true, Int64: utils.GetTimeNow()},
		UpdatedAt:    sql.NullInt64{Valid: true, Int64: utils.GetTimeNow()},
	}

	_, err = l.svcCtx.UserTblModel.Insert(l.ctx, &newUser)
	if err != nil {
		l.Logger.Error(err)
		return &types.RegisterRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	// Generate JWT token
	var iat = l.svcCtx.Config.Auth.AccessExpire
	var accessSecret = l.svcCtx.Config.Auth.AccessSecret
	token, err := utils.GetJwtToken(utils.JwtTokenInput{
		SecretKey: accessSecret,
		Iat:       iat,
		Seconds:   l.svcCtx.Config.Auth.AccessExpire,
		UserID:    newUser.Id,
		Payload:   newUser,
	})
	if err != nil {
		l.Logger.Error(err)
		return &types.RegisterRes{
			Result: types.Result{
				Code:    common.UNKNOWN_ERR_CODE,
				Message: common.UNKNOWN_ERR_MESS,
			},
		}, nil
	}

	// Set the token in the response
	resp = &types.RegisterRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
		Token: token,
		User: types.User{
			UserID:   newUser.Id,
			Email:    newUser.Email,
			Role:     newUser.Role,
			Status:   newUser.Status,
			FullName: newUser.FullName.String,
		},
	}
	l.Logger.Infof("Register response: %v", resp)

	return resp, nil
}
