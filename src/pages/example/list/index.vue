<template>
  <view class="list-example">
    <fanc-navbar title="列表示例" left-arrow @click-left="goBack" />
    
    <view class="example-section">
      <view class="example-section__title">基础用法</view>
      <view class="example-section__content">
        <fanc-list 
          :loading="loading1" 
          :no-more="noMore1" 
          :is-empty="isEmpty1"
          @load="onLoad1"
        >
          <view 
            v-for="(item, index) in list1" 
            :key="index" 
            class="list-item"
          >
            <text class="list-item__title">{{ item.title }}</text>
            <text class="list-item__desc">{{ item.desc }}</text>
          </view>
        </fanc-list>
      </view>
    </view>

    <view class="example-section">
      <view class="example-section__title">错误状态与重试</view>
      <view class="example-section__content">
        <fanc-list 
          :loading="loading2" 
          :error="error2"
          :no-more="noMore2" 
          :is-empty="isEmpty2"
          @load="onLoad2"
          @retry="onRetry2"
        >
          <view 
            v-for="(item, index) in list2" 
            :key="index" 
            class="list-item"
          >
            <text class="list-item__title">{{ item.title }}</text>
            <text class="list-item__desc">{{ item.desc }}</text>
          </view>
        </fanc-list>
      </view>
    </view>

    <view class="example-section">
      <view class="example-section__title">空列表提示</view>
      <view class="example-section__content">
        <fanc-list 
          :loading="loading3" 
          :no-more="noMore3" 
          :is-empty="isEmpty3"
          empty-text="暂无数据，请稍后再试"
          @load="onLoad3"
        >
          <view 
            v-for="(item, index) in list3" 
            :key="index" 
            class="list-item"
          >
            <text class="list-item__title">{{ item.title }}</text>
            <text class="list-item__desc">{{ item.desc }}</text>
          </view>
          <template #empty>
            <view class="custom-empty">
              <fanc-icon name="inbox" size="48" color="#cccccc"></fanc-icon>
              <text class="custom-empty__text">暂无列表数据</text>
              <fanc-button size="small" type="primary" @click="refreshList3">刷新数据</fanc-button>
            </view>
          </template>
        </fanc-list>
      </view>
    </view>

    <view class="example-section">
      <view class="example-section__title">瀑布流列表</view>
      <view class="example-section__content">
        <fanc-list 
          :loading="loading4" 
          :no-more="noMore4" 
          :is-empty="isEmpty4"
          @load="onLoad4"
        >
          <view class="waterfall-list">
            <view 
              v-for="(item, index) in list4" 
              :key="index" 
              class="waterfall-item"
              :style="{ height: item.height + 'px' }"
            >
              <view class="waterfall-item__content">
                <view class="waterfall-item__img" :style="{ 'background-color': item.color }"></view>
                <view class="waterfall-item__info">
                  <text class="waterfall-item__title">{{ item.title }}</text>
                  <text class="waterfall-item__desc">{{ item.desc }}</text>
                </view>
              </view>
            </view>
          </view>
        </fanc-list>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 基础示例数据
      loading1: false,
      noMore1: false,
      isEmpty1: false,
      list1: [],
      page1: 1,
      
      // 错误状态示例数据
      loading2: false,
      error2: false,
      noMore2: false,
      isEmpty2: false,
      list2: [],
      page2: 1,
      
      // 空列表示例数据
      loading3: true,
      noMore3: false,
      isEmpty3: false,
      list3: [],
      
      // 瀑布流示例数据
      loading4: false,
      noMore4: false,
      isEmpty4: false,
      list4: [],
      page4: 1
    };
  },
  
  mounted() {
    // 初始化示例数据
    this.initExample1();
    this.initExample2();
    this.initExample3();
    this.initExample4();
  },
  
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    
    // 初始化基础示例
    initExample1() {
      this.loadMoreData1();
    },
    
    // 初始化错误示例
    initExample2() {
      this.loadMoreData2();
    },
    
    // 初始化空列表示例
    initExample3() {
      setTimeout(() => {
        this.loading3 = false;
        this.isEmpty3 = true;
      }, 1000);
    },
    
    // 初始化瀑布流示例
    initExample4() {
      this.loadMoreData4();
    },
    
    // 基础示例加载更多
    onLoad1() {
      if (this.loading1 || this.noMore1) return;
      this.loadMoreData1();
    },
    
    // 加载基础示例数据
    loadMoreData1() {
      this.loading1 = true;
      
      setTimeout(() => {
        // 模拟数据加载
        if (this.page1 <= 3) {
          const newItems = Array.from({ length: 10 }, (_, i) => ({
            title: `列表项 ${(this.page1 - 1) * 10 + i + 1}`,
            desc: `这是列表项的描述信息 ${(this.page1 - 1) * 10 + i + 1}`
          }));
          
          this.list1 = [...this.list1, ...newItems];
          this.page1++;
        } else {
          this.noMore1 = true;
        }
        
        this.loading1 = false;
      }, 1000);
    },
    
    // 错误示例加载更多
    onLoad2() {
      if (this.loading2 || this.noMore2 || this.error2) return;
      this.loadMoreData2();
    },
    
    // 加载错误示例数据
    loadMoreData2() {
      this.loading2 = true;
      this.error2 = false;
      
      setTimeout(() => {
        // 模拟数据加载
        if (this.page2 === 1) {
          const newItems = Array.from({ length: 10 }, (_, i) => ({
            title: `列表项 ${i + 1}`,
            desc: `这是列表项的描述信息 ${i + 1}`
          }));
          
          this.list2 = [...this.list2, ...newItems];
          this.page2++;
          this.loading2 = false;
        } else if (this.page2 === 2) {
          // 模拟加载失败
          this.loading2 = false;
          this.error2 = true;
          this.$toast.error('网络错误，加载失败');
        } else if (this.page2 <= 4) {
          const newItems = Array.from({ length: 10 }, (_, i) => ({
            title: `列表项 ${(this.page2 - 1) * 10 + i + 1}`,
            desc: `这是列表项的描述信息 ${(this.page2 - 1) * 10 + i + 1}`
          }));
          
          this.list2 = [...this.list2, ...newItems];
          this.page2++;
          this.loading2 = false;
        } else {
          this.noMore2 = true;
          this.loading2 = false;
        }
      }, 1000);
    },
    
    // 错误重试
    onRetry2() {
      this.error2 = false;
      this.loadMoreData2();
    },
    
    // 空列表示例加载更多
    onLoad3() {
      if (this.loading3 || this.noMore3) return;
      this.loading3 = true;
      
      setTimeout(() => {
        this.loading3 = false;
      }, 1000);
    },
    
    // 刷新空列表
    refreshList3() {
      this.loading3 = true;
      this.isEmpty3 = false;
      
      setTimeout(() => {
        const newItems = Array.from({ length: 10 }, (_, i) => ({
          title: `列表项 ${i + 1}`,
          desc: `这是列表项的描述信息 ${i + 1}`
        }));
        
        this.list3 = newItems;
        this.loading3 = false;
        this.$toast.success('刷新成功');
      }, 1000);
    },
    
    // 瀑布流示例加载更多
    onLoad4() {
      if (this.loading4 || this.noMore4) return;
      this.loadMoreData4();
    },
    
    // 加载瀑布流示例数据
    loadMoreData4() {
      this.loading4 = true;
      
      setTimeout(() => {
        // 模拟数据加载
        if (this.page4 <= 3) {
          const colors = ['#FFC107', '#FF9800', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4'];
          
          const newItems = Array.from({ length: 10 }, (_, i) => ({
            title: `瀑布流项目 ${(this.page4 - 1) * 10 + i + 1}`,
            desc: `这是瀑布流的描述信息 ${(this.page4 - 1) * 10 + i + 1}`,
            height: Math.floor(Math.random() * 100) + 120, // 随机高度
            color: colors[Math.floor(Math.random() * colors.length)] // 随机颜色
          }));
          
          this.list4 = [...this.list4, ...newItems];
          this.page4++;
        } else {
          this.noMore4 = true;
        }
        
        this.loading4 = false;
      }, 1000);
    }
  }
};
</script>

<style>
.list-example {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 30px;
}

.example-section {
  margin: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

.example-section__title {
  font-size: 16px;
  font-weight: 500;
  color: #323233;
  padding: 16px;
  border-bottom: 1px solid #f2f3f5;
}

.example-section__content {
  padding: 0;
}

/* 基础列表样式 */
.list-item {
  padding: 16px;
  border-bottom: 1px solid #f2f3f5;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item__title {
  font-size: 16px;
  color: #323233;
  line-height: 24px;
  margin-bottom: 4px;
}

.list-item__desc {
  font-size: 14px;
  color: #969799;
  line-height: 20px;
}

/* 自定义空状态 */
.custom-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.custom-empty__text {
  font-size: 14px;
  color: #969799;
  margin: 16px 0;
}

/* 瀑布流样式 */
.waterfall-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px;
}

.waterfall-item {
  width: 50%;
  padding: 8px;
  box-sizing: border-box;
}

.waterfall-item__content {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.waterfall-item__img {
  width: 100%;
  height: 120px;
  background-color: #f2f3f5;
}

.waterfall-item__info {
  padding: 12px;
  flex: 1;
}

.waterfall-item__title {
  font-size: 14px;
  color: #323233;
  line-height: 20px;
  margin-bottom: 4px;
  font-weight: 500;
}

.waterfall-item__desc {
  font-size: 12px;
  color: #969799;
  line-height: 18px;
}
</style> 