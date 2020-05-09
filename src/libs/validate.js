/* 验证邮箱格式 */
export function validateEmail(val) {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return reg.test(val);
}

/* 验证手机号格式 */
export function validateMobile(val) {
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    return reg.test(val);
}