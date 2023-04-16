import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi"
 

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        // endpoints here
        getConversations : builder.query({
          query:(email)=>`/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_LIMIT}`
        }),

        getConversation: builder.query({
          query:({usersEmail, participantEmail})=>`/conversations?participants_like=${usersEmail}-${participantEmail}&&participants_like=${participantEmail}-${usersEmail}`
        }),

        addConversation: builder.mutation({
          query: ({sender, data})=>({
            url: "/conversations",
            method: "POST",
            body: data,
          }),
          async onQueryStarted(arg, { queryFulfilled, dispatch}){
             const conversation = await queryFulfilled ;
             if(conversation?.data?.id){
              // entry to message table
              const users = arg.data.users;
              const senderUser = users.find(user => user.email === arg.sender)
              const receiverUser = users.find(user => user.email !== arg.sender)

              dispatch(messagesApi.endpoints.addMessages.initiate({
                conversationId: conversation?.data?.id,
                sender: senderUser,
                receiver: receiverUser,
                message: arg.data.message,
                timestamp: new Date().getTime()
                
              }))
             }
          }
        }),

        editConversation: builder.mutation({
          query: ({sender, id, data})=> ({
            url:`/conversations/${id}`,
            method: "PATCH",
            body: data,
          }),
          async onQueryStarted(arg, { queryFulfilled, dispatch}){

            // optimistic cache update start
            const pathResult1 = dispatch(apiSlice.util.updateQueryData("getConversations", arg.sender, (draft)=>{
                const draftConversation = draft.find(conversation => conversation.id == arg.id);
                draftConversation.message = arg.data.message;
                draftConversation.timestamp = arg.data.timestamp;
            
               }));
            // optimistic cache update end


           try {
            const conversation = await queryFulfilled ;
            if(conversation?.data.id){
             // entry to message table 
             const users = arg.data.users;
             const senderUser = users.find(user => user.email === arg.sender)
             const receiverUser = users.find(user => user.email !== arg.sender)

             dispatch(messagesApi.endpoints.addMessages.initiate({
               conversationId: conversation?.data?.id,
               sender: senderUser,
               receiver: receiverUser,
               message: arg.data.message,
               timestamp: new Date().getTime()
               
             }))
            }
           } catch (error) {
             pathResult1.undo()
           }
         }
        }),
    }),
});

export const { 
  useGetConversationsQuery, 
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation
} = conversationsApi;

