
                function input()
                {
                    for(var i=0; i<data.length; ++i)
                    {
                        var task = data[i];
                        normalize(task); 
                    }
                    sort_id(data)
                }

                function sort_id(data)
                {
                    data.sort(function(a,b)
                    {
                        if (a.id <b.id)
                            {
                                return -1
                            }
                        
                        if (a.id > b.id)
                        {
                            return 1;
                        }
                       if(a.id===b.id)
                       {
                        return 0
                       }
                    }
                        );
                }

                function normalize(task)
                {
                    task.id = normalized_id(task.id);
                    task.parent_id = normalized_id(task.parent_id);
                }

                function normalized_id(id)
                {
                    var pars_id= parseInt(id);

                    if(isNaN(pars_id))
                    {
                        return null;
                    }
                    return pars_id;
                }
              
                function try_catch(task)
                {
                    try
                    {
                        return task.id
                    }
                    catch(exc)
                    {
                        return null;
                    }
                }

                function childs_parent (task_parent)
                {
                     var parent_id=try_catch(task_parent);
                      var children=[];
                     
                      for(var i=0; i<data.length; ++i) 
                      {
                          var help_task=data[i];
                          if(help_task.parent_id===parent_id)
                          {
                              children.push(help_task);
                          }
                      } 
                  children.forEach(function(children){childs_parent(children)});
      
                  if (task_parent)
                  {
                      task_parent.children = children;
                  }
                  else
                  {
                      return children;	
                  }
                  return help_task      
              }

              //rysowanie 
              function draw_background()
                {
                    var newDiv = null;
                    for(var i=1;i<26;i++)
                    {
                        newDiv=document.createElement("div");
                        newDiv.style.width="4%";
                        newDiv.style.height="100vh";
                        if(i%2==0)
                        {
                            newDiv.style.background="#59d4e8";
                        }
                        else
                        {
                            newDiv.style.background="#39bdc8";
                        }
                        newDiv.style.float="left";
                        if(i<10)
                        {
                            newDiv.textContent="0"+i+".05 ";
                        }
                        else
                        {
                            newDiv.textContent=i+".05";
                        }
                        newDiv.style.fontSize="20px";
                        newDiv.style.textAlign="center";
                        newDiv.style.color="#black";
                        document.body.appendChild(newDiv)
                    }

                }

                //rysowanie elemntów
                function draw_elements(get_child, array_all)
               
                {
                    var sum_day=new Array(array_all.length);
                    var start_day=new Array(array_all.length);
                    //parsownaie daty 
                    for (i = 0; i < array_all.length; i++) 
                    {
                        var end=Date.parse(array_all[i].end_time);
                        end=end/1000;
                        end=end/3600;
                        end=end/24;

                        var start=Date.parse(array_all[i].start_time);
                        start=start/1000;
                        start=start/3600;
                        start=start/24;

                        sum_day[i]=end-start;
                        sum_day[i]=sum_day[i]+1;

                        start_day[i]=Date.parse(array_all[i].start_time)- Date.parse(array_all[0].start_time);;
                        start_day[i]=start_day[i]/86400000;
                    
                        var element;
                        var start=0;
                        var j=0;
                        var height=get_child[j].children.length+1;
                
                        if (array_all[i].parent_id==null)
                        {
                        element=document.createElement("div");
                        element.style.background="rgba(202, 165, 241, 0.9)";
                        element.textContent=array_all[i].name;
                        element.style.position="absolute";
                        element.style.top=(start+i+1)*4+"%";
                        element.style.left=start_day[i]*4+"%";
                        element.style.width=sum_day[i]*4+"%";
                        element.style.height=height*4+"%";
                        element.style.margin.top="3%"
                        element.style.fontSize="20px"
                        element.style.textAlign="center";
                        document.body.appendChild(element)
                        j++
                        }
                        else
                        {
                                element=document.createElement("div");
                                element.style.background="rgba(250, 192, 225, 0.9)";
                                element.textContent=array_all[i].name;
                                element.style.position="absolute";
                                element.style.top=(start+i+1)*4+"%";
                                element.style.left=start_day[i]*4+"%";
                                element.style.width=sum_day[i]*4+"%";
                                element.style.height="4%";
                                element.style.margin.top="3%"
                                element.style.fontSize="12px";
                                document.body.appendChild(element) 
                                
                        }
                        
                    }
                }


              function main()
              {
                input();
                draw_background();
                var get_child= childs_parent();
                console.table(get_child);
                var Index=0;
                var array_all=[];
                
                for(i=0;i<get_child.length;i++)
                {
                    array_all[Index]=get_child[i];
                    Index++;
                    if(get_child[i].children.length>0)
                    {
                        for(j=0;j<get_child[i].children.length;j++)
                        {
                            array_all[Index]=get_child[i].children[j];
                            Index++;
                            if(get_child[i].children[j].children.length>0)
                            {
                                for(k=0;k<get_child[i].children[j].children.length;k++)
                                {
                                    array_all[Index]=get_child[i].children[j].children[k];
                                    Index++;  
                                }
                            } 
                        }
                    }
                    else
                    {
                        Index++;
                    }
                }
                //console.table(array_all);
                
                draw_elements(get_child, array_all);
              }
               
  
   