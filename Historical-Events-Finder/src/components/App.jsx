import React from 'react'
import ReactPaginate from 'react-paginate';
import $ from 'jquery'

class App extends React.Component{
        constructor(props){
            super(props)
            this.state={
                events:[],
                pagesCount : 0,
                date:'',
                Description:''

            }
            this.handlePageClick = this.handlePageClick.bind(this)
        }
        handlePageClick({ selected: selectedPage }){
            const {events,pagesCount,date,Description} = this.state 
            var page = selectedPage+1
            if(date == ''){
                var url = '/event?q='+Description+'&_page='+page
            }else{
                var url = '/event?date='+date+'&q='+Description+'&_page='+page
            }
            $.ajax({
                url:url,
                method:'GET',
                contentType:'application/json',
                success:(data)=>{
                    this.setState({events: data})
                }
            })
        }
        countPages(){
            const {events,pagesCount,date,Description} = this.state 
            if(date == ''){
                var url = '/event?q='+Description
            }else{
                var url = '/event?date='+date+'&q='+Description
            }
            $.ajax({
                url:url,
                method:'GET',
                contentType:'application/json',
                success:(data)=>{
                    this.setState({pagesCount: Math.ceil(data.length / 10)})
                    this.handlePageClick({selected:0})
                }
            })
        }

        render(){
            const {events,pagesCount} = this.state
            return(
                <div>
                    <h1>Historical Events Finder</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Date :</th>
                                <th>Word : </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input onChange={(e)=>this.setState({date:e.target.value})} /></td>
                                <td><input onChange={(e)=>this.setState({Description:e.target.value})} /></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <button type='button' onClick={()=>this.countPages()} >Find</button>
                    {events.map((e,i)=><div className="card" key={i}><p>date : {e.date}</p><p>Location : {e.category2}</p><p dangerouslySetInnerHTML={{ __html:'Description :'+e.description}} /> </div>)}
                    <ReactPaginate
                            previousLabel={"← Previous"}
                            nextLabel={"Next →"}
                            initialPage={0}
                            pageCount={pagesCount}
                            onPageChange={({ selected: selectedPage })=>this.handlePageClick({ selected: selectedPage })}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName={"pagination__link--active"}
                    />
                </div>
            )
        }

}

export default App;