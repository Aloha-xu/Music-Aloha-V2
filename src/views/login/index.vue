<template>
  <div class="login-box">
    <!-- 弹出框 居中 切三种登录方式 密码 二维吗 短信 -->
    <el-dialog :visible.sync="loginDialogVisible" width="450px">
      <!-- 切换模式tab-->
      <div class="login-mode_tab" @click="handleChangeLoginModeFunc">
        <!-- 两张图片 切换-->
        <div class="login-mode--QR" v-show="!isShowQR">
          <svg
            t="1651721176691"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3603"
            width="52"
            height="52"
          >
            <path
              d="M129 102h321c16.569 0 30 13.431 30 30v322c0 16.569-13.431 30-30 30H129c-16.569 0-30-13.431-30-30V132C99 115.431 112.431 102 129 102z m70.692 70.877c-16.569 0-30 13.432-30 30v180.246c0 16.568 13.431 30 30 30h179.616c16.569 0 30-13.432 30-30V202.877c0-16.568-13.431-30-30-30H199.692z m56.92 57.07h65.776c16.568 0 30 13.431 30 30v66.106c0 16.569-13.432 30-30 30h-65.776c-16.568 0-30-13.431-30-30v-66.106c0-16.569 13.432-30 30-30zM129 540h321c16.569 0 30 13.431 30 30v322c0 16.569-13.431 30-30 30H129c-16.569 0-30-13.431-30-30V570c0-16.569 13.431-30 30-30z m70.692 70.877c-16.569 0-30 13.432-30 30v180.246c0 16.568 13.431 30 30 30h179.616c16.569 0 30-13.432 30-30V640.877c0-16.568-13.431-30-30-30H199.692z m56.92 57.07h65.776c16.568 0 30 13.431 30 30v66.106c0 16.569-13.432 30-30 30h-65.776c-16.568 0-30-13.431-30-30v-66.106c0-16.569 13.432-30 30-30zM574 102h321c16.569 0 30 13.431 30 30v322c0 16.569-13.431 30-30 30H574c-16.569 0-30-13.431-30-30V132c0-16.569 13.431-30 30-30z m70.692 70.877c-16.569 0-30 13.432-30 30v180.246c0 16.568 13.431 30 30 30h179.616c16.569 0 30-13.432 30-30V202.877c0-16.568-13.431-30-30-30H644.692z m56.92 57.07h65.776c16.568 0 30 13.431 30 30v66.106c0 16.569-13.432 30-30 30h-65.776c-16.568 0-30-13.431-30-30v-66.106c0-16.569 13.432-30 30-30z"
              fill="#2F54EB"
              p-id="3604"
            ></path>
            <path
              d="M544 541m30 0l31 0q30 0 30 30l0 31q0 30-30 30l-31 0q-30 0-30-30l0-31q0-30 30-30Z"
              fill="#2F54EB"
              p-id="3605"
            ></path>
            <path
              d="M834 541m30 0l31 0q30 0 30 30l0 31q0 30-30 30l-31 0q-30 0-30-30l0-31q0-30 30-30Z"
              fill="#2F54EB"
              p-id="3606"
            ></path>
            <path
              d="M544 831m30 0l31 0q30 0 30 30l0 31q0 30-30 30l-31 0q-30 0-30-30l0-31q0-30 30-30Z"
              fill="#2F54EB"
              p-id="3607"
            ></path>
            <path
              d="M635 632m30 0l31 0q30 0 30 30l0 139q0 30-30 30l-31 0q-30 0-30-30l0-139q0-30 30-30Z"
              fill="#2F54EB"
              p-id="3608"
            ></path>
            <path
              d="M834 723m30 0l31 0q30 0 30 30l0 139q0 30-30 30l-31 0q-30 0-30-30l0-139q0-30 30-30Z"
              fill="#2F54EB"
              p-id="3609"
            ></path>
            <path
              d="M925 861v31c0 16.569-13.431 30-30 30H756c-16.569 0-30-13.431-30-30v-31c0-16.569 13.431-30 30-30h139c16.569 0 30 13.431 30 30z"
              fill="#2F54EB"
              p-id="3610"
            ></path>
          </svg>
        </div>
        <div class="login-mode--phone" v-show="isShowQR">
          <svg
            t="1651721285456"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6301"
            width="52"
            height="52"
          >
            <path
              d="M 417.02 905.275 m -46.0058 0 a 46.0058 46.0058 0 1 0 92.0116 0 a 46.0058 46.0058 0 1 0 -92.0116 0 Z"
              fill="#3d3cff"
              p-id="6302"
            ></path>
            <path
              d="M 770.226 28.1971 H 611.432 c -32.6493 0 -63.8145 11.8725 -87.5594 32.6493 H 181.055 C 142.47 60.8464 111.304 94.9797 111.304 135.049 v 810.296 c 0 41.5536 31.1652 74.2029 69.7507 74.2029 h 473.414 c 38.5855 0 69.7507 -34.1333 69.7507 -74.2029 v -608.464 h 46.0058 c 74.2029 0 135.049 -60.8464 135.049 -135.049 v -40.0696 c 0 -74.2029 -60.8464 -133.565 -135.049 -133.565 Z M 371.014 111.304 h 93.4957 c 5.93623 0 11.8725 5.93623 11.8725 11.8725 s -5.93623 11.8725 -11.8725 11.8725 H 371.014 c -5.93623 0 -11.8725 -5.93623 -11.8725 -11.8725 s 5.93623 -11.8725 11.8725 -11.8725 Z m 46.0058 863.722 c -38.5855 0 -69.7507 -31.1652 -69.7507 -69.7507 s 31.1652 -69.7507 69.7507 -69.7507 s 69.7507 31.1652 69.7507 69.7507 s -31.1652 69.7507 -69.7507 69.7507 Z M 652.986 780.615 c 0 13.3565 -8.90435 23.7449 -20.7768 23.7449 H 203.316 c -11.8725 0 -20.7768 -10.3884 -20.7768 -23.7449 V 207.768 c 0 -13.3565 8.90435 -23.7449 20.7768 -23.7449 h 273.067 v 19.2928 c 0 60.8464 41.5536 112.788 96.4638 129.113 l -16.3246 59.3623 l 94.9797 -54.9101 h 1.48406 v 443.733 Z M 715.316 252.29 H 556.522 c -7.42029 0 -14.8406 -5.93623 -14.8406 -14.8406 c 0 -7.42029 5.93623 -14.8406 14.8406 -14.8406 h 158.794 c 8.90435 0 14.8406 7.42029 14.8406 14.8406 s -5.93623 14.8406 -14.8406 14.8406 Z m 109.82 -54.9101 H 556.522 c -7.42029 0 -14.8406 -5.93623 -14.8406 -14.8406 c 0 -7.42029 5.93623 -14.8406 14.8406 -14.8406 h 268.615 c 7.42029 0 14.8406 7.42029 14.8406 14.8406 s -5.93623 14.8406 -14.8406 14.8406 Z m 0 -54.9101 H 556.522 c -7.42029 0 -14.8406 -5.93623 -14.8406 -14.8406 c 0 -7.42029 5.93623 -14.8406 14.8406 -14.8406 h 268.615 c 7.42029 1.48406 14.8406 7.42029 14.8406 14.8406 s -5.93623 14.8406 -14.8406 14.8406 Z"
              fill="#3d3cff"
              p-id="6303"
            ></path>
          </svg>
        </div>
      </div>
      <div class="login-content">
        <!-- 普通登录-->
        <div class="normal-login" v-if="!isShowQR">
          <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <!--  免密登录-->
            <el-tab-pane label="免密登录" name="noteForLogin">
              <el-form :model="freeForm" :rules="rules" ref="freeForm">
                <el-form-item prop="phone">
                  <el-input
                    placeholder="手机号"
                    v-model.number="freeForm.phone"
                    class="input-with-select select-clean"
                  >
                    <el-select
                      v-model="freeForm.countrycode"
                      placeholder="请选择"
                      slot="prepend"
                    >
                      <el-option
                        v-for="item in countrycode"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                  <el-input
                    v-model.number="freeForm.captcha"
                    placeholder="请输入验证码"
                    ><div slot="append">
                      <div
                        @click="getCaptcha"
                        v-show="!isShowCaptcha"
                        style="color:#175199;cursor: pointer;"
                      >
                        点击获取验证码
                      </div>
                      <div v-show="isShowCaptcha">
                        <span ref="CountDown">60</span>
                        秒后重新获取
                      </div>
                    </div></el-input
                  >
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('freeForm')"
                    style="width:100%"
                    >登录</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!--  密码登录-->
            <el-tab-pane label="密码登录" name="pwdForLogin">
              <el-form :model="normalForm" :rules="rules" ref="normalForm">
                <el-form-item prop="phone">
                  <el-input
                    placeholder="手机号"
                    v-model.number="normalForm.phone"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item prop="md5_password">
                  <el-input
                    v-model="normalForm.md5_password"
                    show-password
                    placeholder="密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('normalForm')"
                    style="width:100%"
                    >登录</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- 二维码登录-->
        <div class="QR-login" v-if="isShowQR"></div>
      </div>
      <div class="login-foot">
        <!-- slot 留下的插槽 可以放一些其他登录方式 或者 other-->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CountDown from "@/utils/countdown.js";
export default {
  name: "Login",
  data() {
    return {
      //验证码flag
      isShowCaptcha: false,
      //展示QR二维码
      isShowQR: true,
      loginDialogVisible: true,
      activeName: "noteForLogin",
      //校验
      //免密登录表单数据
      freeForm: {
        phone: "",
        captcha: "",
        countrycode: "86",
      },
      //密码登录表单数据
      normalForm: {
        phone: "",
        //md5
        md5_password: "",
      },

      rules: {
        // pass: [{ validator: validatePass, trigger: "blur" }],
        phone: [
          { required: true, message: "不能为空" },
          { type: "number", message: "请输入数字" },
        ],
        md5_password: [{ required: true, message: "不能为空" }],
        captcha: [
          { required: true, message: "不能为空" },
          { type: "number", message: "请输入数字" },
        ],
      },

      //国家代码
      countrycode: [
        { value: "86", label: "+86 中国" },
        { value: "1", label: "+1 美国" },
      ],
    };
  },
  methods: {
    //验证码倒计时
    handleShowCodeFunc() {
      CountDown.openTimeCountBySeconds({
        Ele: this.$refs.CountDown,
        CountDownSeconds: 2,
        Divider: " ",
        that: this,
        EndFunc: function(that) {
          //显示获取验证码验证码
          that.isShowCaptcha = !that.isShowCaptcha;
        },
      });
    },
    //切换登录模式（ 快速 - 密码 ）
    handleTabClick() {},
    //切换登录模式( 二维码 - normal )
    handleChangeLoginModeFunc() {
      this.isShowQR = !this.isShowQR;
    },
    //提交表单
    submitForm(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取验证码
    getCaptcha() {
      this.$refs["freeForm"].validateField("phone", (valid) => {
        if (!valid) {
          this.isShowCaptcha = !this.isShowCaptcha;
          this.handleShowCodeFunc();
          //请求验证码
        }
      });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
//清除样式
::v-deep {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn {
    display: none;
  }
  .el-dialog__body {
    padding: 0 20px 30px 20px;
  }

  .el-tabs__nav-wrap::after {
    background-color: white;
    height: 2px;
  }
  .el-tabs__nav-scroll {
    line-height: 54px;
  }
  .el-input__inner {
    border-radius: 0px;
    border: 0px;
    border-bottom: 1px solid #ebebeb;
  }
  .el-input__prefix {
    width: 100px;
  }
  .el-select {
    width: 100px;
    background-color: white;
  }
  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus,
  .el-form-item.is-error .el-textarea__inner,
  .el-form-item.is-error .el-textarea__inner:focus,
  .el-message-box__input input.invalid,
  .el-message-box__input input.invalid:focus {
    border-color: #ebebeb;
  }
  .el-input-group__append {
    border: 0px;
    background-color: white;
    border-bottom: 1px solid #ebebeb;
  }
}

.login-box {
  .login-mode_tab {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
    .login-mode--QR {
      display: inline-block;
    }
    .login-mode--phone {
      display: inline-block;
    }
  }
}
</style>
