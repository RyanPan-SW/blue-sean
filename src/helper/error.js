// 错误码

 export const errorCode = {
  // 邮箱或密码错误
  LO001: 'Incorrect email address or password.(个人用户)',
  // 用户名或密码错误
  LO002: 'Incorrect username or password.(企业用户)',
  // 邮箱不存在
  LO003: 'Sorry, the email address does not exist.',
  // 验证码无效
  LO004: "That code doesn't work. Please try again.",
  // 邮箱已被注册
  LO005: 'Email has already been registered.',
  // 新密码不能与旧密码一样
  LO006: "The new password can't be the same as the current password.",
  // 未登录
  LO007: 'Not logged in.',
  // 系统异常
  SY001: 'System exception.',
  // 参数异常
  SY002: 'Parameter exception.',
}
