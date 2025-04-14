import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import FoodSelector from '../components/FoodSelector';
import RecipeCard from '../components/RecipeCard';
import RecipeDecision from '../components/RecipeDecision';
import CustomRecipeModal from '../components/CustomRecipeModal';

export default function Home() {
  // 应用状态
  const [currentStep, setCurrentStep] = useState('select'); // select, recommend, decide
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // 处理URL参数，检查是否是分享链接
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shareId = urlParams.get('share');
    
    if (shareId) {
      // 在实际应用中，这里应该根据shareId获取保存的菜单数据
      // 这里简单模拟一个分享的菜单
      setCurrentStep('decide');
      // 模拟数据会在后面设置
    }
  }, []);
  
  // 处理食材选择
  const handleSelectIngredients = async (ingredients) => {
    setSelectedIngredients(ingredients);
    setCurrentStep('recommend');
    await fetchRecipeRecommendations(ingredients);
  };
  
  // 获取菜谱推荐
  const fetchRecipeRecommendations = async (ingredients) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/getRecipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });
      
      if (!response.ok) {
        throw new Error('获取菜谱推荐失败');
      }
      
      const data = await response.json();
      
      // 检查API返回的数据格式
      if (data.recipes && Array.isArray(data.recipes)) {
        setRecipes(data.recipes);
      } else if (data.rawContent) {
        // 如果返回的是原始内容，尝试解析
        console.warn('API返回了原始内容，尝试解析', data.rawContent);
        // 这里可以添加更复杂的解析逻辑
        setRecipes([]);
        setError('无法解析API返回的数据');
      } else {
        console.error('API返回了意外的数据格式', data);
        setRecipes([]);
        setError('API返回了意外的数据格式');
      }
    } catch (err) {
      console.error('获取菜谱推荐出错:', err);
      setError('获取菜谱推荐失败: ' + err.message);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };
  
  // 切换菜谱选择状态
  const toggleRecipeSelection = (recipe) => {
    setSelectedRecipes(prev => {
      const isSelected = prev.some(r => r.name === recipe.name);
      
      if (isSelected) {
        return prev.filter(r => r.name !== recipe.name);
      } else {
        return [...prev, recipe];
      }
    });
  };
  
  // 添加自定义菜谱
  const handleAddCustomRecipe = (customRecipe) => {
    setRecipes(prev => [...prev, customRecipe]);
    setSelectedRecipes(prev => [...prev, customRecipe]);
  };
  
  // 确认菜谱选择
  const handleConfirmSelection = () => {
    if (selectedRecipes.length === 0) {
      alert('请至少选择一道菜谱');
      return;
    }
    
    setCurrentStep('decide');
  };
  
  // 返回推荐页面
  const handleBackToRecommend = () => {
    setCurrentStep('recommend');
  };
  
  // 重新开始
  const handleReset = () => {
    setSelectedIngredients([]);
    setRecipes([]);
    setSelectedRecipes([]);
    setCurrentStep('select');
  };
  
  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>宝宝点菜机</title>
        <meta name="description" content="情侣协同点菜应用" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* 头部 */}
      <header className="bg-primary text-white py-6 px-4 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold">宝宝点菜机</h1>
          <p className="mt-2 opacity-90">今天吃什么，一起来决定</p>
        </div>
      </header>
      
      {/* 主内容区 */}
      <main className="container mx-auto py-6 px-4">
        {currentStep === 'select' && (
          <FoodSelector onSelectIngredients={handleSelectIngredients} />
        )}
        
        {currentStep === 'recommend' && (
          <div className="w-full max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-primary mb-2">推荐菜谱</h2>
              <p className="text-gray-600">根据您的食材，我们推荐以下健康低脂菜谱</p>
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FaSpinner className="text-primary text-4xl animate-spin mb-4" />
                <p className="text-gray-600">正在生成菜谱推荐...</p>
              </div>
            ) : error ? (
              <div className="bg-error bg-opacity-10 text-error p-4 rounded-lg mb-6">
                <p>{error}</p>
                <button 
                  className="mt-4 btn-primary"
                  onClick={() => fetchRecipeRecommendations(selectedIngredients)}
                >
                  重试
                </button>
              </div>
            ) : recipes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">暂无推荐菜谱</p>
                <button 
                  className="btn-primary"
                  onClick={() => setCurrentStep('select')}
                >
                  返回选择食材
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {recipes.map((recipe, index) => (
                    <RecipeCard 
                      key={index}
                      recipe={recipe}
                      onSelect={toggleRecipeSelection}
                      isSelected={selectedRecipes.some(r => r.name === recipe.name)}
                    />
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                  <button 
                    className="btn-secondary"
                    onClick={() => setCurrentStep('select')}
                  >
                    返回选择食材
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={handleConfirmSelection}
                  >
                    确认选择
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        
        {currentStep === 'decide' && (
          <RecipeDecision 
            selectedRecipes={selectedRecipes}
            onBack={handleBackToRecommend}
            onReset={handleReset}
          />
        )}
      </main>
      
      {/* 悬浮按钮 - 仅在推荐页面显示 */}
      {currentStep === 'recommend' && !loading && (
        <button 
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-accent text-white shadow-lg flex items-center justify-center text-xl hover:scale-105 transition-transform z-10"
          onClick={() => setModalOpen(true)}
          aria-label="添加自定义菜谱"
        >
          <FaPlus />
        </button>
      )}
      
      {/* 自定义菜谱模态框 */}
      <CustomRecipeModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddCustomRecipe}
        availableIngredients={selectedIngredients}
      />
      
      {/* 页脚 */}
      <footer className="bg-primary text-white py-4 px-4 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-sm opacity-80">宝宝点菜机 &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
