package com.example.studybuddy.adapter;

import android.annotation.SuppressLint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.studybuddy.R;
import com.example.studybuddy.model.GroupInfo;

import java.util.List;

public class UserGroupListAdapter extends RecyclerView.Adapter<UserGroupListAdapter.myViewHolder> {

    List<GroupInfo> groupInfoList;
    private OnGroupClickListener mOnGroupClickListener;

    public UserGroupListAdapter(List<GroupInfo> groupInfoList, OnGroupClickListener onGroupClickListener) {
        this.groupInfoList = groupInfoList;
        this.mOnGroupClickListener = onGroupClickListener;
    }

    public void updateGroupInfoList(List<GroupInfo> groupInfoList) {
        this.groupInfoList = groupInfoList;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public myViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.layout_group, parent, false);
        return new myViewHolder(view, mOnGroupClickListener);
    }

    @SuppressLint("SetTextI18n")
    @Override
    public void onBindViewHolder(@NonNull myViewHolder holder, int position) {
        GroupInfo groupInfo = groupInfoList.get(position);
        holder.groupName.setText(groupInfo.getName());
        holder.groupSubject.setText(groupInfo.getSubject());
        holder.groupMembersLength.setText((int) groupInfo.getMembersLength() + "");
        holder.modules.setText(groupInfo.getModules().size() + "");
        // holder.index.setText((position + 1) + "");
    }

    @Override
    public int getItemCount() {
        return (groupInfoList == null) ? 0 : groupInfoList.size();
    }

    public static class myViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        TextView groupName, groupSubject, groupMembersLength, modules, index;
        OnGroupClickListener onGroupClickListener;
        public myViewHolder(@NonNull View itemView, OnGroupClickListener onGroupClickListener) {
            super(itemView);

            groupName = itemView.findViewById(R.id.group_name);
            groupSubject = itemView.findViewById(R.id.group_subject);
            groupMembersLength = itemView.findViewById(R.id.group_members_length);
            modules = itemView.findViewById(R.id.group_modules);
            // index = itemView.findViewById(R.id.group_index);

            this.onGroupClickListener = onGroupClickListener;

            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            onGroupClickListener.onGroupClick(getAdapterPosition());
        }
    }

    public interface OnGroupClickListener {
        void onGroupClick(int position);
    }
}
