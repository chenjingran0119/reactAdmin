import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Table,
    Icon,
    Modal,
    Input,
    Form,
    Select,
    Card,
    message
} from 'antd'
import {reqCategorys,reqAddCategorys,reqUpdateCategorys} from '../../api'
const Item = Form.Item
const Option = Select.Option
/*分类管理的路由*/
export default class Category extends Component{
    state = {
        parentId:'0',//当前分类列表的parentId
        parentName:'',//父分类的名称
        categorys:[],//所有一级分类的数组
        subCategorys : [],//所有二级分类列表
        isShowAdd:false,//是否显示添加的对话框
        isShowUpdate:false//是否显示更新的对话框
    }
    //根据当前的parentId得到分类（一级/二级）列表并更新状态
    getCategorys = async(pId) => {
        //pId:如果有值是用它,如果没有值使用state中的parentId
        const parentId = pId || this.state.parentId
        const result = await reqCategorys(parentId)
        if(result.status===0){
            //categorys是根据parentId取的,不一定是一级,所以更新的时候,不能更新categorys
            const categorys = result.data
            //更新状态
            if(parentId === '0'){
                this.setState({
                    categorys
                })
            }else{
                this.setState({
                    subCategorys:categorys
                })
            }

        }
    }
    //添加分类
    addCategory = async() => {
        //隐藏添加框
        this.setState({
            isShowAdd:false
        })
        //提交添加分类的请求
        const {parentId,categoryName}=this.form.getFieldsValue()
        //重置表单项
        this.form.resetFields()
        const result= await reqAddCategorys(parentId,categoryName)
        if(result.status===0){
            //如果添加的是二级列表,不需要重新更新
            if(parentId===this.state.parentId||parentId==='0'){
                this.getCategorys(parentId)
            }

        }
    }
    //更新分类
    showUpdate = (category)=>{
        //保存分类对象
        this.category =category
        console.log(category)
        //显示更新分类的modal
        this.setState({
            isShowUpdate:true
        })
    }

    //更新分类
    updateCategory = async() =>{

        //隐藏对话框
        this.setState({
            isShowUpdate:false
        })
      //收集数据,需要id和name,老的数据可以取到id,新的只能通过form
        const categoryId = this.category._id
        const {categoryName} = this.form.getFieldsValue()
        //重置表单项
        this.form.resetFields()
        //发ajax请求,更新
        const result = await reqUpdateCategorys({categoryId,categoryName})
        if(result.status===0){
            //获取最新分类列表
            message.success('更新分类成功')
           this.getCategorys()
        }
    }
    //显示二级分类列表
    showSubcategorys = (category) => {
        //setState()是异步更新的状态,状态数据并不会立即更新,而是回调处理完后才去更新
        //第二个参数是一个回调函数,回调函数在状态更新后立即执行
        this.setState({
            parentId:category._id,
            parentName:category.name
        },()=>{
            this.getCategorys()
        })

    }
    //显示一级分类
    showCategorys=()=>{
        this.setState({
            parentId:'0',
            parentName:'',
            subCategorys:[]
        })
    }
    //获取一级分类列表
    componentDidMount(){
        this.getCategorys()
}
    componentWillMount(){
        //所有列的数组
        this.columns = [{
            title: '品类名称',
            dataIndex: 'name',
            //render: (value) => <a href="javascript:;">{value}</a>,
        }, {
            title: '操作',
            width:300,
            //把当前的category对象传进来
            render:(category)=>{
                return(
                    <span>
                        {/*直接写this.,还没有写就调用了,里面的参数是要直到点击的是哪条数据*/}
                        <a href="javascript:" onClick={()=>this.showUpdate(category)}>修改分类</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="javascript:" onClick={()=>this.showSubcategorys(category)}>查看子分类</a>
                    </span>
                )
            }
        }]
    }
    render(){
        //得到列的数组
        const columns = this.columns
//展示的列表数据
        const {categorys,isShowAdd,isShowUpdate,parentId,subCategorys,parentName} = this.state
        const category=this.category||{}
        return(
            <div>
                {/*这里面用的前台分页，因为数据量比较小，如果数据量大，就用后台分页*/}
                <Card>
                    {
                        parentId==='0'?
                            <span style={{fontSize:20}}>一级分类列表</span>
                            :(
                                <span style={{fontSize:20}}>
                                    <a href="javascript:" onClick={
                                        this.showCategorys
                                    }>一级分类</a>
                                    &nbsp;&nbsp;&nbsp;
                                    <Icon type="arrow-right" />
                                    &nbsp;&nbsp;&nbsp;
                                    <span>{parentName}</span>
                                </span>
                            )

                    }

                    <Button type='primary'
                            style={{float:'right'}}
                            onClick={()=>{this.setState({isShowAdd:true})}}>
                        <Icon type="plus"/>
                        添加分类
                    </Button>
                </Card>
                <Table
                    columns={columns}
                    dataSource={parentId==='0'?categorys:subCategorys}
                    bordered
                    loading={categorys.length===0}
                    pagination={{defaultPageSize:3,showQuickJumper:true,showSizeChanger:true}}
                    rowKey='_id'
                />
                <Modal
                    title="添加分类"
                    visible={isShowAdd}
                    onOk={this.addCategory}
                    onCancel={()=>this.setState({isShowAdd:false})}
                >
                    <AddForm categorys={categorys} parentId={parentId} setForm={(form)=>this.form=form}/>
                </Modal>
                <Modal
                    title="更新分类"
                    visible={isShowUpdate}
                    onOk={this.updateCategory}
                    onCancel={()=>this.setState({isShowUpdate:false})}
                >
                    <UpdateForm categoryName={category.name} setForm={(form)=>this.form=form}/>

                </Modal>
            </div>
        )
    }
}
/*
添加分类的Form组件
*/
class AddForm extends Component{
    static propTypes= {
        categorys: PropTypes.array.isRequired,
        setForm:PropTypes.func.isRequired,
        parentId:PropTypes.string.isRequired
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render(){
        //作用:1.可以进行表单验证2.可以得到里面的值
        const {getFieldDecorator}=this.props.form
        const {categorys,parentId}=this.props
        return(
            <Form>
                <Item label="所属分类">
                    {/*我们需要收集两个信息,一个是parentId,一个是分类名称,
                    第一个参数传名称,第二个参数传配置,是指定初始值的*/}
                    {
                        getFieldDecorator('parentId',{
                            initialValue:parentId
                        })(
                            <Select>
                                <Option key="0" value='0'>一级分类</Option>
                                {/*根据categorys数据数组生成option标签数组*/}
                                {
                                    categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                                }
                            </Select>

                        )
                    }
                </Item>
                <Item label="分类名称">
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: ''
                        })(
                            <Input placeholder="输入分类名称"/>
                        )
                    }

                </Item>
            </Form>
        )
    }
}


/*通过From组件对象的方法.create返回的函数，这个函数就是包装组件成新组件，作用就是给原组件传递一个from属性，这个属性是一个
* 对象，有很多属性，可以获取数据、重置、验证数据*/
AddForm = Form.create({})(AddForm)

/*
 更新分类的Form组件
 */
class UpdateForm extends Component{
    static propTypes= {
        categoryName: PropTypes.string,
        setForm:PropTypes.func.isRequired
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render(){
        //作用:1.可以进行表单验证2.可以得到里面的值
        const {getFieldDecorator}=this.props.form
        const {categoryName}=this.props
        return(
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: categoryName
                        })(
                            <Input placeholder="输入分类名称"/>
                        )
                    }

                </Item>
            </Form>
        )
    }
}
UpdateForm = Form.create({})(UpdateForm)