<template>
  <view class="container">
    <view class="page-header">
      <view class="page-title">复选框 Checkbox</view>
      <view class="page-desc">在一组备选项中进行多选</view>
    </view>
    
    <view class="page-section">
      <view class="section-header">
        <text class="section-title">基础用法</text>
      </view>
      <view class="section-content">
        <view class="example-block">
          <view class="example-row">
            <fanc-checkbox v-model="checked1" label="复选框"></fanc-checkbox>
          </view>
          <view class="example-row">
            <fanc-checkbox v-model="checked2" label="默认选中" shape="square"></fanc-checkbox>
          </view>
        </view>
      </view>
    </view>
    
    <view class="page-section">
      <view class="section-header">
        <text class="section-title">禁用状态</text>
      </view>
      <view class="section-content">
        <view class="example-block">
          <view class="example-row">
            <fanc-checkbox v-model="checked3" label="禁用状态" disabled></fanc-checkbox>
          </view>
          <view class="example-row">
            <fanc-checkbox v-model="checked4" label="禁用选中状态" disabled></fanc-checkbox>
          </view>
        </view>
      </view>
    </view>
    
    <view class="page-section">
      <view class="section-header">
        <text class="section-title">自定义样式</text>
      </view>
      <view class="section-content">
        <view class="example-block">
          <view class="example-row">
            <fanc-checkbox 
              v-model="checked5" 
              label="自定义颜色" 
              checked-color="#ff6700"
            ></fanc-checkbox>
          </view>
          <view class="example-row">
            <fanc-checkbox 
              v-model="checked6" 
              label="自定义大小" 
              icon-size="large"
            ></fanc-checkbox>
          </view>
          <view class="example-row">
            <fanc-checkbox 
              v-model="checked7" 
              label="紫色+爱心图标" 
              checked-color="#8a2be2"
              icon="heart"
            ></fanc-checkbox>
          </view>
          <view class="example-row">
            <fanc-checkbox 
              v-model="checked8" 
              label="绿色+星星图标" 
              checked-color="#39b54a"
              icon="star"
              shape="square"
            ></fanc-checkbox>
          </view>
        </view>
      </view>
    </view>
    
    <view class="page-section">
      <view class="section-header">
        <text class="section-title">复选框组</text>
      </view>
      <view class="section-content">
        <view class="example-block">
          <fanc-checkbox-group v-model="groupResult1">
            <fanc-checkbox name="1" label="选项一"></fanc-checkbox>
            <fanc-checkbox name="2" label="选项二"></fanc-checkbox>
            <fanc-checkbox name="3" label="选项三"></fanc-checkbox>
          </fanc-checkbox-group>
          <view class="result-display">
            已选中：{{ groupResult1.join(', ') }}
          </view>
        </view>
      </view>
    </view>
    
    <view class="page-section">
      <view class="section-header">
        <text class="section-title">垂直排列</text>
      </view>
      <view class="section-content">
        <view class="example-block">
          <fanc-checkbox-group v-model="groupResult2" direction="vertical">
            <fanc-checkbox name="A" label="选项A"></fanc-checkbox>
            <fanc-checkbox name="B" label="选项B"></fanc-checkbox>
            <fanc-checkbox name="C" label="选项C"></fanc-checkbox>
          </fanc-checkbox-group>
        </view>
      </view>
    </view>
    
    <view class="page-section">
      <view class="section-header">
        <text class="section-title">限制最大选择数量</text>
      </view>
      <view class="section-content">
        <view class="example-block">
          <fanc-checkbox-group 
            v-model="groupResult3" 
            :max="2" 
            @exceed-max="onExceedMax"
          >
            <fanc-checkbox name="X" label="选项X"></fanc-checkbox>
            <fanc-checkbox name="Y" label="选项Y"></fanc-checkbox>
            <fanc-checkbox name="Z" label="选项Z"></fanc-checkbox>
          </fanc-checkbox-group>
          <view class="desc-text">最多只能选择2项</view>
        </view>
      </view>
    </view>
    
    <view class="page-section">
      <view class="section-header">
        <text class="section-title">自定义图标和颜色组合</text>
      </view>
      <view class="section-content">
        <view class="example-block">
          <fanc-checkbox-group v-model="customIcons" direction="vertical">
            <fanc-checkbox name="success" label="成功" checked-color="#07c160" icon="check"></fanc-checkbox>
            <fanc-checkbox name="info" label="信息" checked-color="#1989fa" icon="info"></fanc-checkbox>
            <fanc-checkbox name="warning" label="警告" checked-color="#ff976a" icon="warning"></fanc-checkbox>
            <fanc-checkbox name="error" label="错误" checked-color="#ee0a24" icon="close"></fanc-checkbox>
          </fanc-checkbox-group>
          <view class="result-display">
            已选中：{{ customIcons.join(', ') }}
          </view>
        </view>
      </view>
    </view>
    
    <view class="page-section">
      <view class="section-header">
        <text class="section-title">与单元格组件结合</text>
      </view>
      <view class="section-content">
        <view class="example-block">
          <fanc-cell-group>
            <fanc-cell v-for="(item, index) in cellOptions" :key="index" @click="toggleCell(item)">
              <view slot="title">{{ item.label }}</view>
              <fanc-checkbox 
                slot="right-icon" 
                :value="item.checked" 
                @click.stop 
                checked-color="#ff6700"
              ></fanc-checkbox>
            </fanc-cell>
          </fanc-cell-group>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      checked1: false,
      checked2: true,
      checked3: false,
      checked4: true,
      checked5: true,
      checked6: true,
      checked7: true,
      checked8: true,
      groupResult1: ['1'],
      groupResult2: ['A', 'B'],
      groupResult3: [],
      customIcons: ['success', 'info'],
      cellOptions: [
        { label: '选项一', checked: false },
        { label: '选项二', checked: true },
        { label: '选项三', checked: false }
      ]
    };
  },
  methods: {
    onExceedMax(max) {
      // 使用toast提示
      this.$toast.show({
        type: 'text',
        message: `最多只能选择${max}项`,
        duration: 1500
      });
    },
    toggleCell(item) {
      item.checked = !item.checked;
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 14px;
  color: #646566;
}

.page-section {
  margin-bottom: 24px;
}

.section-header {
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  position: relative;
  padding-left: 10px;
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 20%;
  width: 3px;
  height: 60%;
  background-color: var(--fanc-primary-color);
  border-radius: 3px;
}

.section-content {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.example-block {
  padding: 16px;
}

.example-row {
  margin-bottom: 12px;
}

.example-row:last-child {
  margin-bottom: 0;
}

.result-display {
  margin-top: 12px;
  padding: 8px;
  background-color: #f8f8f8;
  border-radius: 4px;
  font-size: 14px;
  color: #646566;
}

.desc-text {
  margin-top: 8px;
  font-size: 12px;
  color: #969799;
}
</style> 