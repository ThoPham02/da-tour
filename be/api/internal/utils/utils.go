package utils

import (
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type JwtTokenInput struct {
	SecretKey string `json:"secretKey"`
	Iat       int64  `json:"iat"`
	Seconds   int64  `json:"seconds"`
	UserID    int64  `json:"userID"`
	Payload   any    `json:"payload"`
}

func GetJwtToken(input JwtTokenInput) (string, error) {
	claims := make(jwt.MapClaims)
	claims["exp"] = input.Iat + input.Seconds
	claims["iat"] = input.Iat
	claims["userID"] = input.UserID
	claims["payload"] = input.Payload
	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims = claims
	return token.SignedString([]byte(input.SecretKey))
}

func HashPassword(password string) (string, error) {
	var hashpassword string

	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return hashpassword, err
	}

	hashpassword = string(hashedBytes)
	return hashpassword, nil
}

func ConfirmPassword(password string, hashpassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashpassword), []byte(password))

	return err == nil
}

func GetTimeNow() int64 {
	return time.Now().UnixMilli()
}

func GetID() int64 {
	return time.Now().UnixMilli()
}