<style lang="less" scoped>
.form{
    padding: 20px 0;
}
.form-item{
    margin-bottom: 10px;
}
.form-label{
    display: inline-block;
    width: 100px;
    margin-right : 10px;
}
</style>

<template>
    <div>
        <nd-dialog :visible="visible" @update:visible="closeDialog" title="项目管理" @confirm="submit">
            <div class="add-or-update">
                <div class="form">
                    <div class="form-item">
                         <span class='form-label'>名称</span>
                        <nd-input v-model="submitForm.name" />
                    </div>
                     <div class="form-item">
                        <span class='form-label'>项目代码</span>
                        <nd-input v-model="submitForm.code" />
                    </div>
                     <div class="form-item">
                        <span class='form-label'>项目路径</span>
                        <nd-input v-model="submitForm.path"/>
                    </div>
                     <div class="form-item">
                        <span class='form-label'>前端地址</span>
                        <nd-input v-model="submitForm.front"/>
                    </div>
                     <div class="form-item">
                        <span class='form-label'>前端GIT地址</span>
                        <nd-input v-model="submitForm.frontGit"/>
                    </div>
                    <div class="form-item">
                        <span class='form-label'>后端地址</span>
                        <nd-input v-model="submitForm.back"/>
                    </div>
                     <div class="form-item">
                        <span class='form-label'>后端GIT地址</span>
                        <nd-input v-model="submitForm.backGit"/>
                    </div>
                </div>
            </div>
        </nd-dialog>
    </div>
</template>

<script>
import ndDialog from "nd-dialog";
import ndInput from "nd-input";
export default {
  data() {
    return {
      submitForm: {
        name: "",
        code: "",
        path: "",
        front: "",
        frontGit: "",
        back: "",
        backGit: ""
      },
      visible: false
    };
  },
  methods: {
    showAdd(submitForm) {
      if (submitForm) {
          Object.assign(this.submitForm , submitForm);
      }
      this.visible = true;
    },
    closeDialog() {
        this.visible = false;
        let originForm = this.$options.data()['submitForm'];
        Object.assign(this.submitForm , originForm);
    },
    async submit(){
        let result = await this.api.addServer(this.submitForm);
        if(result.success) {
            this.$emit('submit');
        }
    }
  },
  components: {
    "nd-dialog": ndDialog,
    "nd-input": ndInput
  }
};
</script>


